import { DatesSelectionType } from '../../../../types';

/**
 * Даты для столбчатого графика можно выбирать двумя способами:
 * 1. Выбрать отображение последних 7 дней
 * 2. Выбрать диапазон дат из не более 7 дней
 * То есть в столбчатом графике можно выбрать только диапазон дат
 */
export type BarChartSelectionType = {
  isLast7DaysMode: boolean;
  selection: DatesSelectionType;
};
