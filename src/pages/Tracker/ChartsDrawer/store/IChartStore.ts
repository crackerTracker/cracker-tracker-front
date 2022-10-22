interface IChartStore<ApiLoadT, LoadReturnT, ChartConfigT> {
  /**
   * Подготовленный конфиг для chart.js
   */
  chartConfig: ChartConfigT;

  /**
   * Метод загрузки из апи
   * @param from начальная точка, строка типа '2022-04-21T00:00:00.000Z', включается в подсчёт времени
   * @param to конечная точка, '2022-04-21T00:00:00.000Z', включается в подсчёт времени
   * @return загруженные и нормализованные данные (типа LoadReturnT)
   */
  _load(from: string, to: string): LoadReturnT;

  /**
   * Статичный метод нормализации данных
   * @param data данные из апи в соответствии с дженериком ApiLoadT
   * @return нормализованные данные в соответствии с дженериком LoadReturnT
   */
  normalizeApiData(data: ApiLoadT): LoadReturnT;
}
