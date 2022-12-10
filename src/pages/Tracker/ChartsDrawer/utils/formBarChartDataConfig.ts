import moment from 'moment';
import { LOCAL_EXTENDED_DATE_FORMAT } from 'config/datesTimeFormats';
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
    moment(zeroTimestamp).utc().format(LOCAL_EXTENDED_DATE_FORMAT)
  );

  // Формируем столбцы и слои столбцов столбчатого графика
  const datasets: BarChartDatasetType[] = minutesPerCategory.map(
    ({ categoryData, minutesPerDay }) => ({
      label: categoryData.name,
      backgroundColor: categoryData.color,
      data: minutesPerDay,
    })
  );

  return {
    labels,
    datasets,
  };
};

export default formBarChartDataConfig;
