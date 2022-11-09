import * as React from 'react';

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
/**
 * Максимальное количество дней, которое можно запросить в столчатом графике
 */
export const BAR_CHART_MAX_CHOOSING_DAYS = 7;
