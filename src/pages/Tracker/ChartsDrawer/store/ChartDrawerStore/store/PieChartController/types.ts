import { ChartDatesBaseSelectionType } from '../../../../types';
import { SimpleDatesEnum } from '../../../../config';

/**
 * Даты для кругового графика можно выбрать тремя способами:
 * 1. Выбрав один день
 * 2. Выбрав диапазон дат
 * 3. Выбрав в селекторе дат опцию одной даты ("сегодня" или "вчера")
 * 4. Выбрав в селекторе дат опцию диапазона дат (за последние 7 или 30 дней)
 */
export type PieChartSelectionType = ChartDatesBaseSelectionType & {
  simpleDate: SimpleDatesEnum | null; // === null, если выбирается просто дата
};
