import {
  ApiBaseCategoryType,
  BaseCategoryType,
  normalizeBaseCategory,
  TimestampAlias,
} from 'stores/TrackerStore/types';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import {
  CATEGORIES_LIST_PERCENT_TO_PACK,
  FIRST_CATEGORIES_TO_SHOW_AMOUNT,
  getDefaultPieChartData,
  getOthersCategoriesData,
  TrackerChartsEnum,
} from './config';
import moment, { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import formatPercent from 'utils/formatPercent';
import getPercent from 'utils/getPercent';
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
 * Категория со значением процентов (строкой)
 * от потраченного времени на определённые задачи
 */
export type PercentStringStatsCategoryType = BaseCategoryType & {
  percentString?: string;
};

/**
 * Категория со значением процентов (числом от 0 до 100)
 * от потраченного времени на определённые задачи
 */
export type PercentValueStatsCategoryType = BaseCategoryType & {
  percentValue: number;
};

/**
 * Категория-блок "другое" - для задач, чей процент меньше определённого
 * и которые нужно собрать в один блок
 */
export type OthersCategoriesItemType = Omit<
  PercentStringStatsCategoryType,
  'id'
>;

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

/**
 * Делает из категорий с информацией о затраченном времени
 * категории с полем отформатированной строки с процентами
 * @param categories - категории с информацией о затраченном времени
 * @param totalSum - суммарно затраченное время на переданные категории
 */
const statsCategoriesToPercentString = (
  categories: StatsCategoryType[],
  totalSum: number
): PercentStringStatsCategoryType[] =>
  categories.map(
    ({ minutesSpent, ...properties }): PercentStringStatsCategoryType => ({
      ...properties,
      percentString: formatPercent(getPercent(minutesSpent, totalSum)),
    })
  );

/**
 * Сортирует массив объектов, у которых имеется поле minutesSpent, по этому полю
 * @param arrayOfObj массив
 * @param newArray нужно ли отдать новую ссылку на отсортированный массив.
 * Если false - изменит переданный массив и вернёт ссылку на этот массив
 */
const sortEntitiesMinutesSpent = <T>(
  arrayOfObj: (T & { minutesSpent: number })[],
  newArray = false
) => {
  const sortCallback = <T>(
    a: T & { minutesSpent: number },
    b: T & { minutesSpent: number }
  ) => b.minutesSpent - a.minutesSpent;

  if (newArray) {
    return arrayOfObj.slice().sort(sortCallback);
  }

  return arrayOfObj.sort(sortCallback);
};

export type FormatPercentStatsCategoriesConfigType = {
  edgePercent: number;
  firstToShowAmount: number;
};

export type OthersExtendedPercentStatsCategoriesType = {
  categories: PercentStringStatsCategoryType[];
  others: OthersCategoriesItemType | null;
};

/**
 * Формирует список категорий с строковым значением процента и блоком "другое",
 * который формируется по следующему принципу:
 * * Категории с процентом затраченного времени за определённый промежуток
 *   меньшим граничного процента (edgePercent) или равным ему заносятся
 *   в блок "другое", остальные - отадются со своим процентом
 * * Если категорий с процентом меньшим, чем edgePercent, нет,
 *   просто отдать категории со своими процентами
 * * Если все категории с процентом меньшим, чем edgePercent,
 *   отдать первые firstToShowAmount
 * @param statsCategories - категории с информацией о затраченном времени
 * за определённый промежуток времени
 * @param totalSum - всё затраченное время на переданные категории
 * за определённый промежуток времени
 * @param config конфиг для настройки фильтрации категорий:
 * 1. edgePercent - граничный процент. Если у катигории процент
 * меньше, занести её в "другое". Больше нуля и меньше ста.
 * 2. firstToShowAmount - сколько отобразить категорий,
 * если у всех категорий процент меньше edgePercent. Больше нуля
 */
export const formPercentStatsCategories = (
  statsCategories: StatsCategoryType[],
  totalSum: number,
  { firstToShowAmount, edgePercent }: FormatPercentStatsCategoriesConfigType = {
    edgePercent: CATEGORIES_LIST_PERCENT_TO_PACK,
    firstToShowAmount: FIRST_CATEGORIES_TO_SHOW_AMOUNT,
  }
): OthersExtendedPercentStatsCategoriesType => {
  // Категории с процентом затраченного времени за определённый
  // промежуток большим, чем edgePercent
  const categoriesGreaterEdge: StatsCategoryType[] = [];

  // Категории с процентом затраченного времени за определённый
  // промежуток меньшим, чем edgePercent, или равным ему
  const categoriesLessEqualEdge: StatsCategoryType[] = [];

  // Разделяю переданные категории
  // на categoriesGreaterEdge и categoriesLessEqualEdge
  statsCategories.forEach((category) => {
    getPercent(category.minutesSpent, totalSum) <= edgePercent
      ? categoriesLessEqualEdge.push(category)
      : categoriesGreaterEdge.push(category);
  });

  // Если категорий для блока "другие" нет (у всех процент > edgePercent),
  // отдать все те, которые нужно показать
  if (categoriesLessEqualEdge.length === 0) {
    return {
      others: null,
      categories: statsCategoriesToPercentString(
        sortEntitiesMinutesSpent(categoriesGreaterEdge),
        totalSum
      ),
    };
  }

  // Если все категории - с процентом меньшим или равным edgePercent, то отдать
  // первые firstToShowAmount, остальные - в "другое"
  if (categoriesGreaterEdge.length === 0) {
    sortEntitiesMinutesSpent(categoriesLessEqualEdge);

    const toShow = categoriesLessEqualEdge.slice(0, firstToShowAmount);

    // Если категорий с процентом меньшим или равным edgePercent
    // меньше или ровно firstToShowAmount, то отдать их всех
    // (Такое может произойти, если задан слишком высокий edgePercent
    // и/или слишком низкий firstToShowAmount)
    if (toShow.length === categoriesLessEqualEdge.length) {
      return {
        others: null,
        categories: statsCategoriesToPercentString(toShow, totalSum),
      };
    }

    // Если категорий с процентом меньшим или равным edgePercent
    // больше firstToShowAmount, отдать первые firstToShowAmount штук со своими
    // процентами, остальные - в "другое" с сумированием их процентов
    const toHide = categoriesLessEqualEdge.slice(
      firstToShowAmount,
      categoriesLessEqualEdge.length
    );

    const othersMinutesSum = toHide.reduce(
      (sum, { minutesSpent }) => sum + minutesSpent,
      0
    );

    return {
      others: getOthersCategoriesData(
        formatPercent(getPercent(othersMinutesSum, totalSum))
      ),
      categories: statsCategoriesToPercentString(toShow, totalSum),
    };
  }

  // Если есть категории и с большим процентом, чем edgePercent
  // (пусть даже меньше firstToShowAmount), и с меньшим, чем edgePercent,
  // отдать категории с процентом, большим edgePercent,
  // а те, что меньше - в блок "Другое"
  const sumPercentLessEqualEdge = categoriesLessEqualEdge.reduce(
    (sum, { minutesSpent }) => sum + minutesSpent,
    0
  );

  return {
    others: getOthersCategoriesData(
      formatPercent((sumPercentLessEqualEdge / totalSum) * 100)
    ),
    categories: statsCategoriesToPercentString(
      sortEntitiesMinutesSpent(categoriesGreaterEdge),
      totalSum
    ),
  };
};
