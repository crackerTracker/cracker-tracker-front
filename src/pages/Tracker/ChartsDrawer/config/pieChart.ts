import moment from 'moment';
import getLastDaysRange from 'utils/getLastDaysRange';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import {
  DatesSelectionTypesEnum,
  PieChartDataType,
  PieChartOptionsType,
  PieChartSelectionType,
} from '../types';

/**
 * Типы опций выбора в селекторе простых дат
 */
export enum SimpleDatesEnum {
  today = 'today',
  yesterday = 'yesterday',
  last7 = 'last7',
  last30 = 'last30',
}

export const simpleDatesOrder: SimpleDatesEnum[] = [
  SimpleDatesEnum.today,
  SimpleDatesEnum.yesterday,
  SimpleDatesEnum.last7,
  SimpleDatesEnum.last30,
];

export const simpleDatesTexts: Record<SimpleDatesEnum, string> = {
  [SimpleDatesEnum.today]: 'За сегодняшний день',
  [SimpleDatesEnum.yesterday]: 'За вчерашний день',
  [SimpleDatesEnum.last7]: 'За последние 7 дней',
  [SimpleDatesEnum.last30]: 'За последние 30 дней',
};

/**
 * Отдаёт геттеры payload'ов выбора, определённые для опций селектора простых дат
 */
export const getSimpleDatesSelectionPayload: Record<
  SimpleDatesEnum,
  () => PieChartSelectionType
> = {
  [SimpleDatesEnum.today]: () => ({
    simpleDate: SimpleDatesEnum.today,
    selection: {
      selectionType: DatesSelectionTypesEnum.single,
      value: moment().utc(),
    },
  }),
  [SimpleDatesEnum.yesterday]: () => ({
    simpleDate: SimpleDatesEnum.yesterday,
    selection: {
      selectionType: DatesSelectionTypesEnum.single,
      value: moment().subtract(1, 'days').utc(),
    },
  }),
  [SimpleDatesEnum.last7]: () => ({
    simpleDate: SimpleDatesEnum.last7,
    selection: {
      selectionType: DatesSelectionTypesEnum.range,
      value: getLastDaysRange(7),
    },
  }),
  [SimpleDatesEnum.last30]: () => ({
    simpleDate: SimpleDatesEnum.last30,
    selection: {
      selectionType: DatesSelectionTypesEnum.range,
      value: getLastDaysRange(30),
    },
  }),
};

/**
 * Начальные значения для кругового графика
 */
export const getInitialPieChartSelection = (): PieChartSelectionType => ({
  simpleDate: SimpleDatesEnum.today,
  selection: {
    selectionType: DatesSelectionTypesEnum.single,
    value: moment().utc(),
  },
});

/**
 * Значения по умолчанию конфига данных кругового графика
 */
export const getDefaultPieChartData = (): PieChartDataType => ({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderWidth: 0,
    },
  ],
});

export const PIE_CHART_OPTIONS: PieChartOptionsType = {
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        /**
         * Определяет заголовок тултипа (название категории)
         * @param label - название категории, достаётся из первого объекта тултипа
         * (тултип один, поэтому можно обращаться к первому объекту)
         */
        title: ([{ label }]) => label,
        // raw - количество минут на категорию
        label: ({ raw }) => getMinsAndHoursStringFromMins(raw as number),
      },
    },
  },
};
