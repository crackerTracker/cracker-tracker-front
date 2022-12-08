import { Moment } from 'moment';

import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import { DECODED_MID_DASH_STRING } from 'config/symbols';

/**
 * Функция, форматирующая диапазон дат в строку
 * @param dates массив с начальной и конечной датами типа Moment
 * @param format шаблон для форматирования отдельной даты. По умолчанию 'L'
 * @param separator разделитель между датами в итоговой строке. По умолчанию ' – '
 * @return строка типа '10.10.2010 – 12.12.2012'
 */
const formatDatesRange = (
  [start, end]: [Moment, Moment],
  format = CAPITAL_L_MOMENT_FORMAT,
  separator = ` ${DECODED_MID_DASH_STRING} `
) => `${start.format(format)}${separator}${end.format(format)}`;

export default formatDatesRange;
