import colors from 'styles/colors';
import { OthersCategoriesItemType } from '../types';

export enum TrackerChartsEnum {
  pie = 'pie',
  bar = 'bar',
}

export const NO_DATA_TEXT = 'Не удалось получить данные о категориях';
export const NO_DATA_TEXT_EXTRA = 'Попробуйте выбрать другие даты статистики';

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

/**
 * Данные для заполнения данных в блоке "Другое"
 * @param percentString процент от суммарного времени на все категории
 * за определённый промежуток времени
 */
export const getOthersCategoriesData = (
  percentString: string
): OthersCategoriesItemType => ({
  name: 'Другое',
  color: colors.gray,
  percentString,
});
