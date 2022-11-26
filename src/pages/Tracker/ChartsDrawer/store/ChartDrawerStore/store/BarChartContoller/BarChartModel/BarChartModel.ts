import {
  BarChartDataType,
  BarChartOptionsType,
  BarChartRawDataType,
  DatesSelectionType,
  DatesSelectionTypesEnum,
  formBarChartDataConfig,
  normalizeBarChartApiData,
  normalizeStatsCategory,
  PercentStringStatsCategoryType,
} from '../../../../../types';
import { BAR_CHART_OPTIONS, TrackerChartsEnum } from '../../../../../config';
import { action, makeObservable, runInAction, toJS } from 'mobx';
import { DatesStringSelectionType } from '../../types';
import mockRequest from 'utils/mockRequest';
import { mockApiBarChartData, mockApiPieChartData } from '../../../../../mock';
import formZeroISOStringFromTimestamp from 'utils/formZeroISOStringFromTimestamp';
import AbstractChartModel from '../../abstract/AbstractChartModel';

type PrivateFields = '_load' | '_onSetDates';

class BarChartModel extends AbstractChartModel<
  TrackerChartsEnum,
  BarChartRawDataType,
  BarChartDataType,
  BarChartOptionsType
> {
  constructor(chartDataOptions = BAR_CHART_OPTIONS) {
    super(chartDataOptions);
    makeObservable<this, PrivateFields>(this, {
      _load: action.bound, // просто для сохранения контекста
      init: action.bound,
      _onSetDates: action.bound, // просто для сохранения контекста
    });
  }

  /**
   * Создаёт конфиг данных для столбчатого графика
   */
  get chartDataConfig(): BarChartDataType | null {
    if (!this._rawData) {
      return null;
    }

    console.log(
      'go form config',
      toJS(this._rawData),
      formBarChartDataConfig(this._rawData)
    );

    return formBarChartDataConfig(this._rawData);
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStringStatsCategoryType[] | null {
    if (!this._rawData) {
      return null;
    }

    return this._rawData.minutesPerCategory.map(
      ({ category }): PercentStringStatsCategoryType => category
    );
  }

  /**
   * Загружает и нормализует данные. Принимает в качестве значения выбранных
   * дат строки с нулями на месте часов, минут, секунд и миллисекунд.
   * (Столбчатый график грузит только по диапазону)
   */
  protected async _load({
    selectionType,
    value,
  }: DatesStringSelectionType): Promise<BarChartRawDataType | null> {
    if (this._meta.isLoading) {
      return null;
    }

    console.log('go loading');

    this._meta.setLoading();

    await mockRequest();

    // todo проверка

    return normalizeBarChartApiData(mockApiBarChartData);
  }

  /**
   * Инициализирует модель данных выбранными данными
   */
  async init(payload: DatesSelectionType): Promise<void> {
    if (this._meta.isLoading || this._initialized || this._initializing) {
      return;
    }

    this._initializing = true;

    await mockRequest();

    const loaded = normalizeBarChartApiData(mockApiBarChartData);
    // const loaded = await this._onSetDates(payload);

    // todo проверка на loaded

    if (loaded) {
      runInAction(() => {
        this._rawData = loaded;
        this._initializing = false;
        this._initialized = true;
      });
      return;
    }

    this._meta.setError();
  }

  /**
   * Подготавливает данные для загрузки и отдаёт загруженные данные.
   * (Столбчатый график грузит только по диапазону)
   */
  protected async _onSetDates({
    selectionType,
    value,
  }: DatesSelectionType): Promise<BarChartRawDataType | null> {
    if (selectionType === DatesSelectionTypesEnum.range && value) {
      const [startDate, endDate] = value;

      if (!startDate || !endDate) {
        this._meta.setError();
        return null;
      }

      return await this._load({
        selectionType,
        value: [
          formZeroISOStringFromTimestamp(startDate.valueOf()),
          formZeroISOStringFromTimestamp(endDate.valueOf()),
        ],
      });
    }

    this._meta.setError();
    return null;
  }
}

export default BarChartModel;
