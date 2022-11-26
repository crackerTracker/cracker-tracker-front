import moment from 'moment';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import {
  BarChartDatasetType,
  BarChartDataType,
  BarChartRawDataType,
} from '../types';

/**
 * На основе данных о категориях и их минутах по каждому из дней
 * формирует конфиг с данными для столбчатого графика
 * @param days массив с zero-timestamp'ами
 * (то есть метки из дат с нулями на месте часов, минут, секунд и мс)
 * @param minutesPerCategory данные о категориях и их минутах по каждому из дней
 */
const formBarChartDataConfig = ({
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

export default formBarChartDataConfig;
