import RootStore from 'stores/RootStore';
import { makeAutoObservable } from 'mobx';
import { CategoryType, TaskType } from './types';
import { mockCategories, mockDatesMap, mockTasks } from './mock';
import { SelectOptionType } from 'types/antd';

type PrivateFields = 'rootStore';

class TrackerStore {
  private rootStore: RootStore;

  // todo сделать категории мапой
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
          value: category.id,
        });
    });

    return activeCategories;
  }

  // 1. в начале делать инициализацию, затем просто методами обновлять мапу
  // 2. завести функцию, которая будет проходиться по мапе, сверяться с массивами, и делать нужные преобразования мапы
  // 3. сделать функцию, которая будет и обновлять мапу, и обновлять массив в зависимости от того, что нужно сделать + инициализация мапы
  // todo сделать нормализацию массива задач сразу в мапу, на основе пришедших категорий, сделать метод добавления, удаления, редактирования задачи

  get datesArray() {
    return Object.keys(this.datesMap).sort((a, b) => Number(b) - Number(a));
  }

  // todo доделать и прикрутить бек
  createTask = (
    categoryId: string,
    minutesSpent: number,
    zeroTimestamp: number
  ) => {
    // todo заменить на мапу
    const existingCategory = this.categories.find(
      (category) => category.id === categoryId
    );

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
