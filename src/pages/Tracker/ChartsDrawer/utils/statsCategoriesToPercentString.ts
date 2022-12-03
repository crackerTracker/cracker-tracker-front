import formatPercent from 'utils/formatPercent';
import getPercent from 'utils/getPercent';
import { PercentStringStatsCategoryType, StatsCategoryType } from '../types';

/**
 * Делает из категорий с информацией о затраченном времени
 * категорию с полем отформатированной строки с процентами
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

export default statsCategoriesToPercentString;
