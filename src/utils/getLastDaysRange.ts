import moment, { Moment } from 'moment';

/**
 * Формирует диапазон последних дней по отношению к текущему
 * (текущий день включается в диапазон)
 * @param range на сколько дней удалена
 * нижняя граница (день в прошлом) диапазона от текущего. Значение больше нуля
 * @param isUTC задавать ли время в UTC
 */
const getLastDaysRange = (range: number, isUTC = true): [Moment, Moment] => {
  // (range минус один день, так как текущий день включается в диапазон)
  const dayInPast = moment().subtract(range - 1, 'days');

  return isUTC ? [moment().utc(), dayInPast.utc()] : [moment(), dayInPast];
};

export default getLastDaysRange;
