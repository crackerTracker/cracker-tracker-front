import {
  ApiBaseCategoryType,
  BaseCategoryType,
  normalizeBaseCategory,
  TimestampAlias,
} from 'stores/TrackerStore/types';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { getDefaultPieChartData, TrackerChartsEnum } from './config';
import moment, { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import formatPercent from 'utils/formatPercent';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';

/**
 * Загрузить данные можно либо за один день, либо за диапазон дат
 */
export enum DatesSelectionTypesEnum {
  single = 'single', // Выбрана одна дата
  range = 'range', // Выбран диапазон из двух дат
}

/**
 * Payload выбора даты с информацией о том,
 * одна дата выбрана или диапазон из двух
 */
export type DatesSelectionType =
  | {
      selectionType: DatesSelectionTypesEnum.single;
      value: Moment;
    }
  | {
      selectionType: DatesSelectionTypesEnum.range;
      value: RangeValue<Moment>;
    };

export type ChartDatesBaseSelectionType = {
  selection: DatesSelectionType;
};

export type ApiStatsCategoryType = ApiBaseCategoryType & {
  minutesSpent: number;
};

export type StatsCategoryType = BaseCategoryType & {
  minutesSpent: number;
};

export type DaysMapApiStatsCategoryType = Record<
  TimestampAlias,
  ApiStatsCategoryType
>;

export type DaysMapStatsCategoryType = Record<
  TimestampAlias,
  StatsCategoryType[]
>;

export type ApiMinutesPerCategoryType = {
  category: ApiBaseCategoryType;
  // Сколько времени затрачено на данную категорию по каждому из дней
  // (индекс дня равен индексу затраченного времени за этот день)
  minutesPerDay: number[];
};

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

export type BarChartRawDataType = {
  days: TimestampAlias[];
  minutesPerCategory: MinutesPerCategoryType[];
};

/**
 * Категория со значением процентов
 * от потраченного времени на определённые задачи
 */
export type PercentStatsCategoryType = BaseCategoryType & {
  percentString?: string;
};

/**
 * Алиас для типа конфига с данными для кругового графика
 */
export type PieChartDataType = ChartData<
  TrackerChartsEnum.pie,
  number[],
  string
>;

/**
 * Алиас для типа конфига с данными для столбчатого графика
 */
export type BarChartDataType = ChartData<
  TrackerChartsEnum.bar,
  number[],
  string
>;

/**
 * Алиас для типа dataset'ов внутри конфига данных круогового графика
 */
export type PieChartDatasetType = ChartDataset<TrackerChartsEnum.pie, number[]>;

export type BarChartDatasetType = ChartDataset<TrackerChartsEnum.bar, number[]>;

/**
 * Алиас для типа опций кругового графика
 */
export type PieChartOptionsType = ChartOptions<TrackerChartsEnum.pie>;

/**
 * Алиас для типа опций столбчатого графика
 */
export type BarChartOptionsType = ChartOptions<TrackerChartsEnum.bar>;

export const normalizeStatsCategory = ({
  _id,
  ...rest
}: ApiStatsCategoryType): StatsCategoryType => ({
  id: _id,
  ...rest,
});

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

export const formPieChartDataConfig = (
  data: StatsCategoryType[]
): PieChartDataType =>
  data.reduce((dataConfig, { color, minutesSpent, name }) => {
    const labels = dataConfig.labels;
    const dataset = dataConfig.datasets[0];

    if (
      !Array.isArray(labels) ||
      !dataset ||
      !Array.isArray(dataset.backgroundColor)
    ) {
      return dataConfig;
    }

    if (dataset) labels.push(name);
    dataset.data.push(minutesSpent);
    dataset.backgroundColor.push(color);

    return dataConfig;
  }, getDefaultPieChartData());

export const formBarChartDataConfig = ({
  days,
  minutesPerCategory,
}: BarChartRawDataType): BarChartDataType => {
  // Формируем массив дат
  const labels: string[] = days.map((zeroTimestamp) =>
    moment(zeroTimestamp).utc().format(CAPITAL_L_MOMENT_FORMAT)
  );

  // Формируем столбцы и слои столбцов столбчатого графика
  const datasets: BarChartDatasetType[] = minutesPerCategory.map(
    ({ category, minutesPerDay }) => ({
      label: category.name,
      backgroundColor: category.color,
      data: minutesPerDay,
    })
  );

  return {
    labels,
    datasets,
  };
};

export const formPercentStatsCategories = (
  statsCategories: StatsCategoryType[],
  totalSum: number
): PercentStatsCategoryType[] =>
  statsCategories.reduce((acc, { id, name, color, minutesSpent }) => {
    return [
      ...acc,
      {
        id,
        name,
        color,
        percentString: formatPercent(totalSum / minutesSpent),
      },
    ];
  }, [] as PercentStatsCategoryType[]);
