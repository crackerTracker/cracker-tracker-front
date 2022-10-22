import RootStore from 'stores/RootStore';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ApiCategoryType,
  CategoryType,
  TaskType,
  ApiTaskType,
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
  TaskMonthsMapType,
} from './types';
import { SelectOptionType } from 'types/antd';
import { request } from 'utils/request';
import { endpoints } from 'config/endpoints';
import { getAuthHeader } from 'utils/getAuthHeader';
import { daysAmountToLoad } from 'config/tracker';
import convertToZeroTimestamp from 'utils/convertToZeroTimestamp';

type PrivateFields = 'rootStore';

// todo подумать нед тем, чтобы сделать datesMap computed, чтобы datesMap наблюдала за изменениями категорий
// todo и не приходилось делать запрос после изменения категории, затрагивающей какие-либо задачи

// todo предусмотреть лоадинги

class TrackerStore {
  private rootStore: RootStore;

  public categoriesMap: Record<string, CategoryType> = {};

  tasksByYearsMonthsMap: TaskMonthsByYearsMapType = {};

  tasksLoading = false; // в процессе загрузки задач

  extraTasksLoading = false; // в процессе дозагрузки задач (бесконечный скролл)

  canLoadMoreExtraTasks = false; // может ли загрузить ещё задачи для бесконечного скролла

  initializing = false; // в процессе инициализации

  initialized = false; // проинициализировано

  fatalError = false; // есть ли ошибка

  // контейнер, в котором скроллятся дни;
  // может потребоваться для контролирования скролла
  scrollContainerRef: HTMLDivElement | null = null;

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

  get localYearMonth(): { year: number; month: number } {
    const currentDate = new Date();
    return { year: currentDate.getFullYear(), month: currentDate.getMonth() };
  }

  setScrollContainerRef = (ref: HTMLDivElement | null) => {
    this.scrollContainerRef = ref;
  };

  scrollContainerTop = (): void => {
    if (this.scrollContainerRef) {
      this.scrollContainerRef.scrollTo({
        top: 0,
        left: 0,
      });
    }
  };

  getMonthByDate = (date: Date): DaysTasksMapType | null => {
    const year = this.tasksByYearsMonthsMap[date.getUTCFullYear()];

    if (!year) {
      return null;
    }

    const month = year[date.getUTCMonth()];

    if (!month) {
      return null;
    }

    return month;
  };

  getLoadedTaskByDateAndId = (
    id: string,
    date: Date
  ): {
    yearMonthMap: TaskMonthsMapType;
    monthDaysMap: DaysTasksMapType;
    dayTasks: TaskType[];
    dayTimestamp: number;
    dayIndex: number;
    task: TaskType;
  } | null => {
    const loadedYearWithTask =
      this.tasksByYearsMonthsMap[date.getUTCFullYear()];

    if (!loadedYearWithTask) {
      return null;
    }

    const loadedMonthWithTask = loadedYearWithTask[date.getUTCMonth()];

    if (!loadedMonthWithTask) {
      return null;
    }

    const dayTimestamp = date.getTime();

    const dayTasks = loadedMonthWithTask[dayTimestamp];

    if (!dayTasks) {
      return null;
    }

    const dayIndex = dayTasks.findIndex((task) => task.id === id);

    if (dayIndex === -1) {
      return null;
    }

    return {
      dayIndex,
      task: dayTasks[dayIndex],
      dayTimestamp,
      dayTasks,
      yearMonthMap: loadedYearWithTask,
      monthDaysMap: loadedMonthWithTask,
    };
  };

  // загружает с бэка задачи; в случае успеха отдаёт мапу с задачами, иначе null
  loadTasks = async (
    daysAmount: number,
    month: number,
    year: number
  ): Promise<TaskMonthsByYearsMapType | null> => {
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

  // загружает дни с задачами, начиная с текущего месяца;
  // вместо имеющихся данных о днях записывает полученные
  loadInitialDays = async (): Promise<TaskMonthsByYearsMapType | null> => {
    const { year, month } = this.localYearMonth;
    // здесь нам важнее, чтобы пользователь получал данные, начиная с месяца и года по его времени, а не по UTC
    const initialTasks = await this.loadTasks(daysAmountToLoad, month, year);

    if (!initialTasks) {
      runInAction(() => {
        this.fatalError = true;
      });
      return null;
    }

    return initialTasks;
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

    const initialDays = await this.loadInitialDays();

    if (!initialDays) {
      runInAction(() => {
        this.fatalError = true;
      });
      return;
    }

    runInAction(() => {
      this.tasksByYearsMonthsMap = initialDays;
      this.initializing = false;
      this.initialized = true;
    });
  };

  // запускает инициализацию заново;
  // на случай, если понадобится инициализировать приложение снова после неудачной инициализации;
  reinit = async (): Promise<void> => {
    this.scrollContainerTop();
    this.tasksLoading = false;
    this.extraTasksLoading = false;
    this.initializing = false;
    this.initialized = false;
    this.fatalError = false;
    this.canLoadMoreExtraTasks = true;
    this.tasksByYearsMonthsMap = {};
    await this.init();
  };

  loadMoreAfterLastMonth = async (): Promise<void> => {
    if (this.tasksLoading || this.extraTasksLoading || !this.initialized) {
      return;
    }

    const nextMonthToLoad = this.prevUTCMonthForLastLoaded;
    const nextYearToLoad = this.prevUTCYearForLastLoaded;

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

      if (!tasks) {
        return;
      }

      mergeToTaskMonthsByYearsMaps(this.tasksByYearsMonthsMap, tasks);
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
    const datesTasks = this.allDaysArray;

    for (let i = 0; i < datesTasks.length; i++) {
      const tasks = datesTasks[i].tasks;

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
        await this.reinit();
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
        const initialDays = await this.loadInitialDays();
        if (initialDays) {
          this.scrollContainerTop();
          runInAction(() => {
            this.tasksByYearsMonthsMap = initialDays;
          });
        }
      }
    } catch (e) {
      console.log('TrackerStore.editCategory', e);
    }
  };

  addTask = async (categoryId: string, minutesSpent: number, date: Date) => {
    const zeroTimestamp = convertToZeroTimestamp(date.getTime());

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

      if (!response) {
        return;
      }

      const loadedMonthWithAddedTimestamp = this.getMonthByDate(date);

      // если месяц, в который мы добавили задачу, ещё не был загружен
      if (!loadedMonthWithAddedTimestamp) {
        const loadedDaysAmount = this.allDaysArray.length;

        // если при этом задач достаточно, чтобы они занимали весь экран
        if (loadedDaysAmount >= daysAmountToLoad) {
          return;
        }

        // ...иначе, если задач меньше, чем на весь экран
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();

        const addedFirstTask = normalizeTask(response);
        const addedTimestampFirstTask = addedFirstTask.timestamp;

        // формируем новую мапу с одним лишь созданным днём
        const mapForNewMonth = {
          [year]: {
            [month]: {
              [addedTimestampFirstTask]: [addedFirstTask],
            },
          },
        };

        // если загруженных дней вообще нет, присвоить главной мапе созданную мапу
        if (loadedDaysAmount === 0) {
          runInAction(() => {
            this.tasksByYearsMonthsMap = mapForNewMonth;
          });
          return;
        }

        // ...иначе, если хоть какие-то дни уже были загружены ранее,
        // смёржить сформированную мапу и имеющуюся
        runInAction(() => {
          mergeToTaskMonthsByYearsMaps(
            this.tasksByYearsMonthsMap,
            mapForNewMonth
          );
        });

        return;
      }

      const added = normalizeTask(response);
      const addedTimestamp = added.timestamp;

      runInAction(() => {
        // ...иначе если дня (массива с задачами) по заданному timestamp'у в загруженных месяцах не оказалось
        // создать в месяце день с массивом задач, положить туда созданную задачу
        if (!loadedMonthWithAddedTimestamp[addedTimestamp]) {
          loadedMonthWithAddedTimestamp[addedTimestamp] = [added];
          return;
        }

        const dayTasks = loadedMonthWithAddedTimestamp[addedTimestamp];

        // ...иначе если день по заданному timestamp'у есть,
        // найти задачу с той же категорией в массиве задач дня
        const indexTaskWithSameCategory = dayTasks.findIndex(
          ({ category }) => category.id === added.category.id
        );

        // если в дне задача с такой же категорией есть, заменить её на созданную задачу
        // (на бэке время за категории суммируется и отдаётся итоговое)
        if (indexTaskWithSameCategory !== -1) {
          dayTasks[indexTaskWithSameCategory] = added;
        } else {
          // иначе добавить задачу в конец массива задач
          dayTasks.push(added);
        }
      });
    } catch (e) {
      console.log('TrackerStore.addTask', e);
    }
  };

  // todo рассмотреть передачу индекса изменяемой задачи, чтобы не делать поиск по массиву
  deleteTask = async (toDeleteId: string, timestamp: number): Promise<void> => {
    const date = new Date(timestamp);

    const task = this.getLoadedTaskByDateAndId(toDeleteId, date);

    if (!task) {
      return;
    }

    const {
      monthDaysMap: loadedMonthWithTaskToDelete,
      dayIndex: loadedTaskToDeleteIndex,
    } = task;

    try {
      const response = await request({
        url: endpoints.deleteTrackerTask.url,
        method: endpoints.deleteTrackerTask.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
        body: {
          toDeleteId,
        },
      });

      if (!response) {
        return;
      }

      // если в дне есть лишь одна задача - удаляемая -, то удалить день из месяца
      if (loadedMonthWithTaskToDelete[timestamp].length === 1) {
        runInAction(() => {
          delete loadedMonthWithTaskToDelete[timestamp];
        });

        // если после удаления дня оказывается, что дней меньше,
        // чем число дней для подгрузки, загрузить ещё дни
        if (
          this.allDaysArray.length < daysAmountToLoad &&
          this.canLoadMoreExtraTasks
        ) {
          await this.loadMoreAfterLastMonth();
        }

        return;
      }

      // ...иначе удалить задачу из массива задач дня
      runInAction(() => {
        loadedMonthWithTaskToDelete[timestamp].splice(
          loadedTaskToDeleteIndex,
          1
        );
      });
    } catch (e) {
      console.log('TrackerStore.addTask', e);
    }
  };

  // todo рассмотреть передачу индекса изменяемой задачи, чтобы не делать поиск по массиву
  editTask = async (
    toEditId: string,
    timestamp: number,
    toEditFields: {
      date?: string;
      categoryId?: string;
      minutesSpent?: number;
    } = {}
  ): Promise<boolean> => {
    const date = new Date(timestamp);

    const task = this.getLoadedTaskByDateAndId(toEditId, date);

    if (!task) {
      return false;
    }

    const { dayIndex: taskToEditIndex, dayTasks: dayWithEditedTask } = task;

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

      if (!response) {
        return false;
      }

      const edited = normalizeTask(response);

      runInAction(() => {
        dayWithEditedTask[taskToEditIndex] = edited;

        // чтобы обновить ссылку на мапу и триггернуть обновление:
        this.tasksByYearsMonthsMap = Object.assign(
          {},
          this.tasksByYearsMonthsMap
        );
      });

      return true;
    } catch (e) {
      console.log('TrackerStore.editTask', e);
      return false;
    }
  };
}

export default TrackerStore;
