import { LoadingStage } from 'types/meta';

interface IChartStore<ApiLoadT, LoadReturnT, ChartConfigT> {
  // _loadingStage: LoadingStage;

  /**
   * Подготовленный конфиг для chart.js
   */
  // chartConfig: ChartConfigT | null;

  /**
   * Метод загрузки из апи
   * @param from начальная точка, строка типа '2022-04-21T00:00:00.000Z', включается в подсчёт времени
   * @param to конечная точка, '2022-04-21T00:00:00.000Z', включается в подсчёт времени
   * @return загруженные и нормализованные данные (типа LoadReturnT)
   */
  _load(from: string, to: string): Promise<LoadReturnT | null>;
}

export default IChartStore;
