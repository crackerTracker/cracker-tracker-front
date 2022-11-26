import { ChartData, ChartOptions } from 'chart.js';
import { SimpleDatesEnum, TrackerChartsEnum } from '../config';
import { ChartDatesBaseSelectionType } from './common';

/* Типы конфигов: */

/**
 * Алиас для типа конфига с данными для кругового графика
 */
export type PieChartDataType = ChartData<
  TrackerChartsEnum.pie,
  number[],
  string
>;

/**
 * Алиас для типа опций кругового графика
 */
export type PieChartOptionsType = ChartOptions<TrackerChartsEnum.pie>;

/* Типы данных: */

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
