import RootStore from 'stores/RootStore';
import { makeAutoObservable } from 'mobx';
import { CategoryType, TaskType } from './types';
import { mockCategories, mockDatesMap, mockTasks } from './mock';
import { SelectOptionType } from 'types/antd';

type PrivateFields = 'rootStore';

class TrackerStore {
  private rootStore: RootStore;

  public categories: CategoryType[] = mockCategories; // todo заменить

  public tasks: TaskType[] = mockTasks; // todo заменить;

  public datesMap: Record<number, TaskType[]> = mockDatesMap;

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get arrayActiveCategoriesToSelect(): SelectOptionType[] {
    const activeCategories: SelectOptionType[] = [];

    this.categories.forEach((category) => {
      !category.isArchived &&
        activeCategories.push({
          label: category.name,
          value: category.name,
        });
    });

    return activeCategories;
  }

  // 1. в начале делать инициализацию, затем просто методами обновлять мапу
  // 2. завести функцию, которая будет проходиться по мапе, сверяться с массивами, и делать нужные преобразования мапы
  // 3. сделать функцию, которая будет и обновлять мапу, и обновлять массив в зависимости от того, что нужно сделать + инициализация мапы
  // todo сделать нормализацию массива задач сразу в мапу, на основе пришедших категорий, сделать метод добавления, удаления, редактирования задачи

  get datesArray() {
    return Object.keys(mockDatesMap);
  }
}

export default TrackerStore;
