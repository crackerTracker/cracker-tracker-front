import getLastDaysRange from 'utils/getLastDaysRange';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import {
  BarChartDataType,
  BarChartOptionsType,
  BarChartSelectionType,
  DatesSelectionTypesEnum,
} from '../types';

export const LAST_7_DAYS_TEXT = 'За последние 7 дней';

/**
 * Максимальное количество дней, которое можно запросить в столчатом графике
 */
export const BAR_CHART_MAX_CHOOSING_DAYS = 7;

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

/**
 * Значения по умолчанию конфига данных столбчатого графика
 */
export const getDefaultBarChartData = (): BarChartDataType => ({
  labels: [],
  datasets: [],
});

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
