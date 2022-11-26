import {
  CATEGORIES_LIST_PERCENT_TO_PACK,
  FIRST_CATEGORIES_TO_SHOW_AMOUNT,
  getOthersCategoriesData,
} from '../config';
import getPercent from 'utils/getPercent';
import formatPercent from 'utils/formatPercent';
import {
  OthersCategoriesItemType,
  PercentStringStatsCategoryType,
  StatsCategoryType,
} from '../types';
import statsCategoriesToPercentString from './statsCategoriesToPercentString';

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
const formPercentStatsCategories = (
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

export default formPercentStatsCategories;
