/**
 * Форматирует число процентов в строку:
 * * Если число от 0 до 1, отдаёт "<1%"
 * * Если число от 99 до 100, отдаёт ">99%"
 * * В остальных случаях отдаёт число, округлённое
 * до заданногочисла знаков после запятой
 */
const formatPercent = (percentNumber: number, toFixedIndex = 0) =>
  percentNumber > 0 && percentNumber < 1
    ? '<1%'
    : percentNumber > 99 && percentNumber < 100
    ? '>99%'
    : `${percentNumber.toFixed(toFixedIndex)}%`;

export default formatPercent;
