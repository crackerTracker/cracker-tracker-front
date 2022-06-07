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

export const weekPageHeaderDateFormat = 'MMMM Y';

export enum TodoNavigateEnum {
  all = 'all',
  week = 'week',
  day = 'day',
}

export const todosNavigateIcons: Record<TodoNavigateEnum, string> = {
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
