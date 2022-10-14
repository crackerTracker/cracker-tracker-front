import RootStore from 'stores/RootStore';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import {
  ApiCategoryType,
  CategoryType,
  TaskType,
  ApiTaskType,
  normalizeTasksToDatesMap,
  normalizeCategories,
  normalizeCategory,
  normalizeTask,
  normalizeTaskMonths,
  TasksByMonthsApiResponseType,
  TaskMonthsByYearsMapType,
  DaysTasksMapType,
  DayType,
  DaysMapToArray,
  mergeToTaskMonthsByYearsMaps,
} from './types';
import { SelectOptionType } from 'types/antd';
import { request } from 'utils/request';
import { endpoints } from 'config/endpoints';
import { getAuthHeader } from 'utils/getAuthHeader';
import { daysAmountToLoad } from 'config/tracker';

type PrivateFields = 'rootStore';

// todo подумать нед тем, чтобы сделать datesMap computed, чтобы datesMap наблюдала за изменениями категорий
// todo и не приходилось делать запрос после изменения категории, затрагивающей какие-либо задачи

// todo предусмотреть лоадинги

class TrackerStore {
  private rootStore: RootStore;

  public categoriesMap: Record<string, CategoryType> = {};

  public datesMap: Record<number, TaskType[]> = {};

  tasksByYearsMonthsMap: TaskMonthsByYearsMapType = {};

  tasksLoading = false; // в процессе загрузки задач

  extraTasksLoading = false; // в процессе дозагрузки задач (бесконечный скролл)

  canLoadMoreExtraTasks = false; // может ли загрузить ещё задачи для бесконечного скролла

  initializing = false; // в процессе инициализации

  initialized = false; // проинициализировано

  fatalError = false; // есть ли ошибка

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get arrayActiveCategoriesToSelect(): SelectOptionType[] {
    const activeCategories: SelectOptionType[] = [];

    Object.values(this.categoriesMap).forEach((category) => {
      !category.isArchived &&
        activeCategories.push({
          label: category.name,
          value: category.id,
        });
    });

    return activeCategories;
  }

  get activeCategories(): CategoryType[] {
    return Object.values(this.categoriesMap).reduce(
      (acc: CategoryType[], c) => {
        !c.isArchived && acc.push(c);
        return acc;
      },
      []
    );
  }

  get archivedCategories(): CategoryType[] {
    return Object.values(this.categoriesMap).reduce(
      (acc: CategoryType[], c) => {
        c.isArchived && acc.push(c);
        return acc;
      },
      []
    );
  }

  get datesArray() {
    return Object.keys(this.datesMap).sort((a, b) => Number(b) - Number(a));
  }

  get lastLoadedDay(): DayType | null {
    const days = this.allDaysArray;
    return days[days.length - 1] ?? null;
  }

  // отдаём именно UTC-месяц для обращения к бд, так как использовние местного времени
  // может вызвать смещение месяца, это может стать причиной пропуска месяца или запроса уже имеющихся задач
  get prevUTCMonthForLastLoaded(): number | null {
    const lastDay = this.lastLoadedDay;

    if (!lastDay) {
      return null;
    }

    const date = new Date(lastDay.timestamp); // получаем дату по текущему часовому поясу, ибо не можем сразу создать дату в UTC
    date.setUTCMonth(date.getUTCMonth() - 1); // меняем именно utc-месяц, так как обращаемся к апи именно по utc
    return date.getUTCMonth(); // возвращаем utc-месяц
  }

  // отдаёт предыдущий последнему загруженному дню год в utc (чтобы обращаться к бд, где всё хранится в utc)
  get prevUTCYearForLastLoaded(): number | null {
    const lastDay = this.lastLoadedDay;

    if (!lastDay) {
      return null;
    }

    // получаем именно utc, так как обращаемся к бд, где всё хранится в utc
    const year = new Date(lastDay.timestamp).getUTCFullYear();

    // если следующий для загрузки месяц равен декабрю (движение в обратную сторону),
    // значит следующий месяц (январь) был в следующем за ним году, значит нужно загрузить предыдущий год,
    // уменьшив год последнего загруженного дня на один
    return this.prevUTCMonthForLastLoaded === 11 ? year - 1 : year;
  }

  get allDaysArray(): DayType[] {
    // получаем массив годов (массив мап "номер месяца - мапа дней")
    const years = Object.values(this.tasksByYearsMonthsMap);

    // получаем массив месяцев (массив мап "timestamp дня - список задач")
    const months = years.reduce(
      (acc: DaysTasksMapType[], year) => [...acc, ...Object.values(year)],
      [] as DaysTasksMapType[]
    );

    const days = months.reduce(
      (acc: DayType[], month) => [...acc, ...DaysMapToArray(month)],
      [] as DayType[]
    );

    return days.sort((dayA, dayB) => dayB.timestamp - dayA.timestamp);
  }

  // загружает с бэка задачи; в случае успеха отдаёт мапу с задачами, иначе null
  loadTasks = async (
    daysAmount: number,
    month: number,
    year: number
  ): Promise<TaskMonthsByYearsMapType | null> => {
    // todo убрать
    console.log('loadTasks this.tasksLoading', this.tasksLoading);

    if (this.tasksLoading) {
      return null;
    }

    this.tasksLoading = true;

    try {
      const response: TasksByMonthsApiResponseType = await request({
        ...endpoints.getTrackerTasksByMonths,
        body: {
          daysAmount,
          year,
          month,
        },
        headers: getAuthHeader(this.rootStore.authStore.token),
      });

      if (!response || !Array.isArray(response.months)) {
        runInAction(() => {
          this.tasksLoading = false;
        });
        return null;
      }

      // примечание: сейчас получется, что приходящие данные конвертятся в многоуровневую мапу, после чего в массив дней.
      // это для заклада на то, что в будущем можно будет разделять и отображать дни по секциям "месяц, год",
      // а как это будет делаться - не знаю, поэтому сделал как можно более расширяемо
      const normalized = normalizeTaskMonths(
        response.months,
        this.categoriesMap
      );

      runInAction(() => {
        this.canLoadMoreExtraTasks =
          response.collectedDays < response.totalEarlierDays;

        this.tasksLoading = false;
      });

      return normalized;
    } catch (e) {
      console.log('TrackerStore.loadTasks', e);
    }

    runInAction(() => {
      this.tasksLoading = false;
    });

    return null;
  };

  // получает все категории пользователя, результат кладёт в this.categoriesMap,
  // если успех - возвращает true, иначе - false
  getAllCategories = async (): Promise<boolean> => {
    try {
      const response: ApiCategoryType[] = await request({
        url: endpoints.getAllTrackerCategories.url,
        method: endpoints.getAllTrackerCategories.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
      });

      if (!Array.isArray(response)) {
        return false;
      }

      runInAction(() => {
        this.categoriesMap = normalizeCategories(response);
      });

      return true;
    } catch (e) {
      console.log('TrackerStore.getAllCategories', e);
    }

    return false;
  };

  // загружает сначала категории, затем задачи, начиная с текущего месяца;
  // в случае, если что-то из этого не придёт, присвоит fatalError true
  init = async () => {
    if (this.initializing || this.initialized) {
      return;
    }

    if (this.fatalError) {
      this.fatalError = false;
    }

    this.initializing = true;

    const gotAllCategories = await this.getAllCategories();

    if (!gotAllCategories) {
      runInAction(() => {
        this.fatalError = true;
      });
      return;
    }

    const currentDate = new Date();
    // здесь нам важнее, чтобы пользователь получал данные, начиная с месяца и года по его времени, а не по UTC
    const initialTasks = await this.loadTasks(
      daysAmountToLoad,
      currentDate.getMonth(),
      currentDate.getFullYear()
    );

    if (!initialTasks) {
      runInAction(() => {
        this.fatalError = true;
      });
      return;
    }

    runInAction(() => {
      this.tasksByYearsMonthsMap = initialTasks;
      this.initializing = false;
      this.initialized = true;
    });

    // todo убрать
    console.log('initialized success', initialTasks);
  };

  // запускает инициализацию заново;
  // на случай, если понадобится инициализировать приложение снова после неудачной инициализации
  reinit = async (): Promise<void> => {
    this.initialized = false;
    this.fatalError = false;
    await this.init();
  };

  loadMoreAfterLastMonth = async (): Promise<void> => {
    // todo убрать
    console.log(
      'start loadMoreAfterLastMonth',
      'this.tasksLoading',
      this.tasksLoading,
      'this.initialized',
      this.initialized,
      'extraTasksLoading',
      this.extraTasksLoading
    );

    if (this.tasksLoading || this.extraTasksLoading || !this.initialized) {
      return;
    }

    const nextMonthToLoad = this.prevUTCMonthForLastLoaded;
    const nextYearToLoad = this.prevUTCYearForLastLoaded;

    // todo убрать
    console.log(
      'nextMonthToLoad',
      nextMonthToLoad,
      'nextYearToLoad',
      nextYearToLoad
    );

    if (!nextMonthToLoad || !nextYearToLoad) {
      return;
    }

    this.extraTasksLoading = true;

    try {
      const tasks = await this.loadTasks(
        daysAmountToLoad,
        nextMonthToLoad,
        nextYearToLoad
      );

      // todo убрать
      console.log('tasks', tasks);

      if (!tasks) {
        return;
      }

      const merged = mergeToTaskMonthsByYearsMaps(
        this.tasksByYearsMonthsMap,
        tasks
      );

      // todo убрать
      console.log('merged', toJS(merged));
    } catch (e) {
      console.log('TrackerStore.loadMoreAfterLastMonth error', e);
    }

    runInAction(() => {
      this.extraTasksLoading = false;
    });
  };

  // todo доработать типы тела запроса
  createCategory = async (name: string, color: string) => {
    try {
      const response: ApiCategoryType = await request({
        url: endpoints.createTrackerCategory.url,
        method: endpoints.createTrackerCategory.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          name,
          color,
        },
      });

      const createdCategory = normalizeCategory(response);

      runInAction(() => {
        this.categoriesMap[createdCategory.id] = createdCategory;
      });
    } catch (e) {
      console.log('TrackerStore.createCategory', e);
    }
  };

  thereIsTaskWithCategory = (categoryId: string) => {
    const datesTasks = Object.values(this.datesMap);

    for (let i = 0; i < datesTasks.length; i++) {
      const tasks = datesTasks[i];

      if (tasks.find(({ category }) => category.id === categoryId)) {
        return true;
      }
    }

    return false;
  };

  deleteCategory = async (toDeleteId: string) => {
    try {
      await request({
        url: endpoints.deleteTrackerCategory.url,
        method: endpoints.deleteTrackerCategory.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          toDeleteId,
        },
      });

      if (this.thereIsTaskWithCategory(toDeleteId)) {
        await this.getAllTasksInDatesMap();
      }

      runInAction(() => {
        delete this.categoriesMap[toDeleteId];
      });
    } catch (e) {
      console.log('TrackerStore.deleteCategory', e);
    }
  };

  editCategory = async (
    toEditId: string,
    fieldsToEdit: {
      name?: string;
      color?: string;
      isArchived?: boolean;
    } = {}
  ) => {
    try {
      const response: ApiCategoryType = await request({
        url: endpoints.editTrackerCategory.url,
        method: endpoints.editTrackerCategory.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          toEditId: toEditId,
          ...fieldsToEdit,
        },
      });

      const edited = normalizeCategory(response);

      runInAction(() => {
        this.categoriesMap[toEditId] = edited;
      });

      const amountOfFieldsToEdit = Object.keys(fieldsToEdit).length;
      if (
        this.thereIsTaskWithCategory(toEditId) &&
        amountOfFieldsToEdit !== 0 &&
        (amountOfFieldsToEdit === 1
          ? fieldsToEdit.isArchived === undefined
          : true)
      ) {
        await this.getAllTasksInDatesMap();
      }
    } catch (e) {
      console.log('TrackerStore.editCategory', e);
    }
  };

  getAllTasksInDatesMap = async () => {
    try {
      const response: ApiTaskType[] = await request({
        url: endpoints.getAllTrackerTasks.url,
        method: endpoints.getAllTrackerTasks.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
      });

      runInAction(() => {
        this.datesMap = normalizeTasksToDatesMap(
          response,
          this.categoriesMap || undefined
        );
      });
    } catch (e) {
      console.log('TrackerStore.getAllTasks', e);
    }
  };

  // todo заменить таймстемп на дату
  addTask = async (
    categoryId: string,
    minutesSpent: number,
    zeroTimestamp: number
  ) => {
    try {
      const response: ApiTaskType = await request({
        url: endpoints.addTrackerTask.url,
        method: endpoints.addTrackerTask.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          categoryId,
          minutesSpent,
          date: new Date(zeroTimestamp).toISOString(),
        },
      });

      const added = normalizeTask(response);
      const timestamp = added.timestamp;

      runInAction(() => {
        if (!this.datesMap[timestamp]) {
          this.datesMap[timestamp] = [added];
        } else {
          const indexTaskWithSameCategory = this.datesMap[timestamp].findIndex(
            ({ category }) => category.id === added.category.id
          );

          if (indexTaskWithSameCategory !== -1) {
            this.datesMap[timestamp][indexTaskWithSameCategory] = added;
          } else {
            this.datesMap[timestamp].push(added);
          }
        }
      });
    } catch (e) {
      console.log('TrackerStore.addTask', e);
    }
  };

  // todo рассмотреть передачу индекса изменяемой задачи, чтобы не делать поиск по массиву
  deleteTask = async (toDeleteId: string, timestamp: number) => {
    const indexTaskToDelete = this.datesMap[timestamp].findIndex(
      ({ id }) => id === toDeleteId
    );

    if (indexTaskToDelete === -1) {
      return;
    }

    try {
      await request({
        url: endpoints.deleteTrackerTask.url,
        method: endpoints.deleteTrackerTask.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          toDeleteId: toDeleteId,
        },
      });

      runInAction(() => {
        if (this.datesMap[timestamp].length === 1) {
          delete this.datesMap[timestamp];
        } else {
          this.datesMap[timestamp].splice(indexTaskToDelete, 1);
        }
      });
    } catch (e) {
      console.log('TrackerStore.addTask', e);
    }
  };

  // todo рассмотреть передачу индекса изменяемой задачи, чтобы не делать поиск по массиву
  editTask = async (
    toEditId: string,
    toEditFields: {
      date?: string;
      categoryId?: string;
      minutesSpent?: number;
    } = {}
  ): Promise<boolean> => {
    try {
      const response: ApiTaskType = await request({
        url: endpoints.editTrackerTask.url,
        method: endpoints.editTrackerTask.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          toEditId,
          ...toEditFields,
        },
      });

      const edited = normalizeTask(response);
      const indexEdited = this.datesMap[edited.timestamp].findIndex(
        ({ id }) => id === edited.id
      );

      if (indexEdited === -1) {
        throw new Error('Что-то пошло не так');
      }

      runInAction(() => {
        this.datesMap[edited.timestamp][indexEdited] = edited;
      });

      return true;
    } catch (e) {
      console.log('TrackerStore.editTask', e);
      return false;
    }
  };
}

export default TrackerStore;
