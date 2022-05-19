import RootStore from 'stores/RootStore';
import { makeAutoObservable } from 'mobx';
import { CategoryType, TaskType } from './types';
import {
  mockCategories,
  mockCategoriesMap,
  mockDatesMap,
  mockTasks,
} from './mock';
import { SelectOptionType } from 'types/antd';

type PrivateFields = 'rootStore';

class TrackerStore {
  private rootStore: RootStore;

  public categories: CategoryType[] = mockCategories; // todo возможно, не пригодится

  public categoriesMap: Record<string, CategoryType> = mockCategoriesMap;

  public tasks: TaskType[] = mockTasks; // todo возможно, не пригодится

  public datesMap: Record<number, TaskType[]> = mockDatesMap;

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

  // todo доделать и прикрутить бек
  createTask = (
    categoryId: string,
    minutesSpent: number,
    zeroTimestamp: number
  ) => {
    const existingCategory = this.categoriesMap[categoryId];

    if (!existingCategory) {
      return false;
    }

    !this.datesMap[zeroTimestamp] && (this.datesMap[zeroTimestamp] = []);

    // todo обработать ситуацию, когда в дате уже есть задаваемая категория
    this.datesMap[zeroTimestamp].push({
      id: String(100 + Math.random() * 900),
      minutesSpent: minutesSpent,
      timestamp: zeroTimestamp,
      category: existingCategory,
    });

    return true;
  };
}

export default TrackerStore;
