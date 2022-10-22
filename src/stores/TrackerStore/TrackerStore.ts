import RootStore from 'stores/RootStore';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ApiCategoryType,
  CategoryType,
  TaskType,
  ApiTaskType,
  normalizeTasksToDatesMap,
  normalizeCategories,
  normalizeCategory,
  normalizeTask,
} from './types';
import { SelectOptionType } from 'types/antd';
import request from 'utils/request';
import { endpoints } from 'config/endpoints';
import { getAuthHeader } from 'utils/getAuthHeader';

type PrivateFields = 'rootStore';

// todo подумать нед тем, чтобы сделать datesMap computed, чтобы datesMap наблюдала за изменениями категорий
// todo и не приходилось делать запрос после изменения категории, затрагивающей какие-либо задачи

// todo предусмотреть лоадинги

class TrackerStore {
  private rootStore: RootStore;

  public categoriesMap: Record<string, CategoryType> = {};

  public datesMap: Record<number, TaskType[]> = {};

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

  getAllCategories = async () => {
    try {
      const response: ApiCategoryType[] = await request({
        url: endpoints.getAllTrackerCategories.url,
        method: endpoints.getAllTrackerCategories.method,
        headers: getAuthHeader(this.rootStore.authStore.token),
      });

      runInAction(() => {
        this.categoriesMap = normalizeCategories(response);
      });
    } catch (e) {
      console.log('TrackerStore.getAllCategories', e);
    }
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
