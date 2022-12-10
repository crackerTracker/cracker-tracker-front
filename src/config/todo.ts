import { images } from 'img/icons';

export const weekDaysNames = [
  { id: 'Mon', name: 'пн' },
  { id: 'Tue', name: 'вт' },
  { id: 'Wed', name: 'ср' },
  { id: 'Thu', name: 'чт' },
  { id: 'Fri', name: 'пт' },
  { id: 'Sat', name: 'сб' },
  { id: 'Sun', name: 'вс' },
  { id: 'Later', name: 'Когда-нибудь' },
];

export const GROUP_NAME_MAX_LENGTH = 40;

export enum TodoSectionEnum {
  groups = 'groups',
}

export enum TodoNavigateEnum {
  all = 'all',
  week = 'week',
  day = 'day',
  group = 'group',
}

export type TodoPageDisplayType =
  | TodoNavigateEnum.all
  | TodoNavigateEnum.week
  | TodoNavigateEnum.day;

export const todosNavigateIcons: Record<TodoPageDisplayType, string> = {
  [TodoNavigateEnum.all]: images.todoNavigateAll.default,
  [TodoNavigateEnum.week]: images.todoNavigateWeek.default,
  [TodoNavigateEnum.day]: images.todoNavigateDay.default,
};

export const enum TodosToggleEnum {
  all = 'all',
  withDate = 'withDate',
  withoutDate = 'withoutDate',
}

export const todosToggleIcons: Record<TodosToggleEnum, string> = {
  [TodosToggleEnum.all]: images.todoToggleAll.default,
  [TodosToggleEnum.withDate]: images.todoToggleWDate.default,
  [TodosToggleEnum.withoutDate]: images.todoToggleWoutDate.default,
};

export const todosTogglesChangeMap = {
  [TodosToggleEnum.all]: TodosToggleEnum.withDate,
  [TodosToggleEnum.withDate]: TodosToggleEnum.withoutDate,
  [TodosToggleEnum.withoutDate]: TodosToggleEnum.all,
};

export const todosTogglesTitle = {
  [TodosToggleEnum.all]: 'Показать задачи с дедлайном',
  [TodosToggleEnum.withDate]: 'Показать задачи без дедлайна',
  [TodosToggleEnum.withoutDate]: 'Показать все задачи',
};
