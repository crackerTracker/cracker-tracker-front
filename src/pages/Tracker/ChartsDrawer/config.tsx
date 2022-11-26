import * as React from 'react';
import {
  BarChartDataType,
  BarChartOptionsType,
  DatesSelectionTypesEnum,
  OthersCategoriesItemType,
  PieChartDataType,
  PieChartOptionsType,
} from './types';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import {
  PieChartSelectionType,
  BarChartSelectionType,
} from './store/ChartDrawerStore/store';
import moment from 'moment';
import getLastDaysRange from 'utils/getLastDaysRange';
import colors from 'styles/colors';

export enum TrackerChartsEnum {
  pie = 'pie',
  bar = 'bar',
}

export enum SimpleDatesEnum {
  today = 'today',
  yesterday = 'yesterday',
  last7 = 'last7',
  last30 = 'last30',
}

export const simpleDatesTexts: Record<SimpleDatesEnum, string> = {
  [SimpleDatesEnum.today]: 'За сегодняшний день',
  [SimpleDatesEnum.yesterday]: 'За вчерашний день',
  [SimpleDatesEnum.last7]: 'За последние 7 дней',
  [SimpleDatesEnum.last30]: 'За последние 30 дней',
};

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

export const simpleDatesOrder: SimpleDatesEnum[] = [
  SimpleDatesEnum.today,
  SimpleDatesEnum.yesterday,
  SimpleDatesEnum.last7,
  SimpleDatesEnum.last30,
];

export const LAST_7_DAYS_TEXT = 'За последние 7 дней';

/**
 * Максимальное количество дней, которое можно запросить в столчатом графике
 */
export const BAR_CHART_MAX_CHOOSING_DAYS = 7;

/**
 * Процент затраченного времени на категорию от суммарного времени
 * на все категории за промежуток времени, ниже которого (включительно)
 * категории будут включаться в блок "другое" в списке категорий
 */
export const CATEGORIES_LIST_PERCENT_TO_PACK = 10;

/**
 * Для случая, если все категории имеют процент от суммарного времени
 * за все категории за промежуток времени меньше граничного процента -
 * сколько задач показать вверху списка
 */
export const FIRST_CATEGORIES_TO_SHOW_AMOUNT = 5;

export const getOthersCategoriesData = (
  percentString: string
): OthersCategoriesItemType => ({
  name: 'Другое',
  color: colors.gray,
  percentString,
});

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
 * Начальные значения для столбчатого графика
 */
export const getInitialBarChartSelection = (): BarChartSelectionType => ({
  isLast7DaysMode: true,
  selection: {
    selectionType: DatesSelectionTypesEnum.range,
    value: getLastDaysRange(7),
  },
});

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

export const getDefaultBarChartData = (): BarChartDataType => ({
  labels: [],
  datasets: [],
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

export const BAR_CHART_OPTIONS: BarChartOptionsType = {
  // Выключает относительное изменение размеров, чтобы легче позиционировать
  maintainAspectRatio: false,
  plugins: {
    // Работа с тултипом:
    tooltip: {
      callbacks: {
        /**
         * Определяет заголовок тултипа. Вызывается при наведении на тултип.
         * @param label - достаётся из объекта dataset первого объекта тултипа
         * в приходящем в колбэек массиве тултипов.
         * @return название категории
         */
        title: ([
          // Тултип один, поэтому можно обращаться к первому элементу
          {
            dataset: { label },
          },
        ]) => label || '',

        /**
         * Определяет лэйбл тултипа. Вызывается при наведении на тултип
         * @param raw - достаётся из приходящего в параметры объекта тултипа,
         * представляет собой сырые данные (количество минут, уделённое категории)
         * @return строка с количеством времени, уделённого категории
         */
        label: ({ raw }) => getMinsAndHoursStringFromMins(raw as number),
      },
    },
  },
  // Настройки осей графика
  scales: {
    x: {
      // Стакает dataset'ы
      stacked: true,
    },
    y: {
      stacked: true,
      // Работа с делениями оси Y:
      ticks: {
        /**
         * Определяет то, как будут выглядеть деления на оси Y
         * @param value - количество минут
         */
        callback: (value) => getMinsAndHoursStringFromMins(Number(value)),
      },
    },
  },
};
