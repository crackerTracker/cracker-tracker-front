import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';

import {
  ApiBaseCategoryType,
  BaseCategoryType,
} from 'stores/TrackerStore/types';

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

export type DatesStringSelectionType =
  | {
      selectionType: DatesSelectionTypesEnum.single;
      value: string;
    }
  | {
      selectionType: DatesSelectionTypesEnum.range;
      value: [string, string];
    };

export type ChartDatesBaseSelectionType = {
  selection: DatesSelectionType;
};

/**
 * Категория для статистики в ответе сервера
 */
export type ApiStatsCategoryType = ApiBaseCategoryType & {
  minutesSpent: number;
};

/**
 * Нормализованная категория для статистики
 */
export type StatsCategoryType = BaseCategoryType & {
  minutesSpent: number;
};

/**
 * Категория со значением процентов (строкой)
 * от потраченного времени на определённые задачи
 */
export type PercentStringStatsCategoryType = BaseCategoryType & {
  percentString?: string;
};

/**
 * Категория-блок "другое" - для задач, чей процент меньше определённого
 * и которые нужно собрать в один блок
 */
export type OthersCategoriesItemType = Omit<
  PercentStringStatsCategoryType,
  'id'
>;

export type StatisticsRequestDatesType = {
  start: string;
  end?: string;
};

export const normalizeStatsCategory = ({
  _id,
  ...rest
}: ApiStatsCategoryType): StatsCategoryType => ({
  id: _id,
  ...rest,
});
