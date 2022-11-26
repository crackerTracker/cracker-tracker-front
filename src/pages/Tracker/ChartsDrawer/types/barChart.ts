import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { TrackerChartsEnum } from '../config';
import {
  ApiBaseCategoryType,
  BaseCategoryType,
  normalizeBaseCategory,
  TimestampAlias,
} from 'stores/TrackerStore/types';
import { ChartDatesBaseSelectionType } from './common';

/* Типы конфигов: */

/**
 * Алиас для типа конфига с данными для столбчатого графика
 */
export type BarChartDataType = ChartData<
  TrackerChartsEnum.bar,
  number[],
  string
>;

/**
 * Алиас для типа dataset'ов внутри конфига данных стобчатого графика
 */
export type BarChartDatasetType = ChartDataset<TrackerChartsEnum.bar, number[]>;

/**
 * Алиас для типа опций столбчатого графика
 */
export type BarChartOptionsType = ChartOptions<TrackerChartsEnum.bar>;

/* Типы данных: */

export type ApiMinutesPerCategoryType = {
  category: ApiBaseCategoryType;
  // Сколько времени затрачено на данную категорию по каждому из дней
  // (индекс дня равен индексу затраченного времени за этот день)
  minutesPerDay: number[];
};

/**
 * Ответ сервера на запрос за статистикой для столбчатого графика
 */
export type BarChartApiDataType = {
  // Массив дней (zero-timestamp'ов)
  days: TimestampAlias[];
  // Сколько было затрачено времени по каждой категории по каждому из дней
  minutesPerCategory: ApiMinutesPerCategoryType[];
};

export type MinutesPerCategoryType = {
  category: BaseCategoryType;
  minutesPerDay: number[];
};

/**
 * Нормализованный ответ сервера о статистике для столбчатого графика
 */
export type BarChartRawDataType = {
  days: TimestampAlias[];
  minutesPerCategory: MinutesPerCategoryType[];
};

/**
 * Даты для столбчатого графика можно выбирать двумя способами:
 * 1. Выбрать отображение последних 7 дней
 * 2. Выбрать диапазон дат из не более 7 дней
 * То есть в столбчатом графике можно выбрать только диапазон дат
 */
export type BarChartSelectionType = ChartDatesBaseSelectionType & {
  isLast7DaysMode: boolean;
};

export const normalizeBarChartApiData = ({
  days,
  minutesPerCategory,
}: BarChartApiDataType): BarChartRawDataType => {
  const minutesSpentPerCategories = minutesPerCategory.map(
    ({ category: apiCategory, minutesPerDay }): MinutesPerCategoryType => ({
      category: normalizeBaseCategory(apiCategory),
      minutesPerDay,
    })
  );

  return {
    days,
    minutesPerCategory: minutesSpentPerCategories,
  };
};
