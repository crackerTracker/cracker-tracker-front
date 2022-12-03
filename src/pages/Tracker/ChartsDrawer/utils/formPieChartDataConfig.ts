import { getDefaultPieChartData } from '../config';
import { StatsCategoryType, PieChartDataType } from '../types';

/**
 * На основе данных о категориях и уделённому им времени
 * формирует конфиг с данными для графика
 * @param data массив с категориями
 */
const formPieChartDataConfig = (data: StatsCategoryType[]): PieChartDataType =>
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

export default formPieChartDataConfig;
