import * as React from 'react';
import {
  BarChartDataType,
  BarChartOptionsType,
  DatesSelectionTypesEnum,
  PieChartDataType,
  PieChartOptionsType,
} from './types';
import { getMinsAndHoursStringFromMins } from '../../../utils/getMinsAndHoursFromMins';
import { PieChartSelectionType } from './store/ChartDrawerStore/store/PieChartController/types';
import moment from 'moment';
import { BarChartSelectionType } from './store/ChartDrawerStore/store/BarChartContoller/types';
import { DAYS_IN_WEEK } from '../../../config/time';

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
 * Начальные значения для кругового графика
 */
export const getInitialPieChartSelection = (): PieChartSelectionType => ({
  simpleDate: SimpleDatesEnum.today,
  dateSelection: {
    selectionType: DatesSelectionTypesEnum.single,
    value: moment().utc(),
  },
});

export const getInitialBarChartSelection = (): BarChartSelectionType => ({
  isLast7DaysMode: true,
  selection: {
    selectionType: DatesSelectionTypesEnum.range,
    value: [
      moment().utc(),
      moment()
        // (6 дней, так как текущий день включается в диапазон)
        .subtract(DAYS_IN_WEEK - 1, 'days')
        .utc(),
    ],
  },
});

export const getDefaultPieChartData = (): PieChartDataType => ({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
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
