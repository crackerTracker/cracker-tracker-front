import {
  BarChartDataType,
  BarChartOptionsType,
  BarChartRawDataType,
  DatesSelectionType,
  DatesSelectionTypesEnum,
  DaysMapStatsCategoryType,
  formBarChartDataConfig,
  formPercentStatsCategories,
  formPieChartDataConfig,
  normalizeBarChartApiData,
  normalizeStatsCategory,
  PercentStatsCategoryType,
  PieChartDataType,
  PieChartOptionsType,
  StatsCategoryType,
} from '../../../types';
import MetaModel from '../../../../../../stores/models/MetaModel';
import { BAR_CHART_OPTIONS, PIE_CHART_OPTIONS } from '../../../config';
import { makeAutoObservable, runInAction } from 'mobx';
import { DatesStringSelectionType } from './types';
import mockRequest from '../../../../../../utils/mockRequest';
import { mockApiBarChartData, mockApiPieChartData } from '../../../mock';
import formZeroISOStringFromTimestamp from '../../../../../../utils/formZeroISOStringFromTimestamp';

class BarChartModel {
  /**
   * Конфиг опций графика. Кладётся в пропс options графика
   */
  private readonly _chartOptions: BarChartOptionsType;

  /**
   * Состояние загрузки
   */
  private readonly _meta: MetaModel = new MetaModel();

  /**
   * Проинициализирована ли модель
   */
  private _initialized = false;

  /**
   * Мапа "день - список категорий с затраченным временем"
   */
  private _rawData: BarChartRawDataType | null = null;

  // todo в контроллер
  // private _isLast7DaysMode = true;

  constructor(chartDataOptions = BAR_CHART_OPTIONS) {
    makeAutoObservable(this);

    this._chartOptions = chartDataOptions;
  }

  // todo в контроллер
  // get isLast7DaysMode(): boolean {
  //   return this._isLast7DaysMode;
  // }

  get meta(): MetaModel {
    return this._meta;
  }

  get initialized(): boolean {
    return this._initialized;
  }

  // todo контроллер
  // get last7DaysRange(): [Moment, Moment] {
  //   return [moment(), moment().subtract(DAYS_IN_WEEK - 1, 'days')];
  // }

  /**
   * Создаёт конфиг данных для столбчатого графика
   */
  get chartDataConfig(): BarChartDataType | null {
    if (!this._rawData) {
      return null;
    }

    return formBarChartDataConfig(this._rawData);
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStatsCategoryType[] | null {
    if (!this._rawData) {
      return null;
    }

    return this._rawData.minutesPerCategory.map(
      ({ category }): PercentStatsCategoryType => category
    );
  }

  /**
   * Загружает и нормализует данные. Принимает в качестве значения выбранных
   * дат строки с нулями на месте часов, минут, секунд и миллисекунд.
   * (Столбчатый график грузит только по диапазону)
   */
  private _load = async ({
    selectionType,
    value,
  }: DatesStringSelectionType): Promise<BarChartRawDataType | null> => {
    if (this._meta.isLoading) {
      return null;
    }

    this._meta.setLoading();

    await mockRequest();

    // todo проверка

    return normalizeBarChartApiData(mockApiBarChartData);
  };

  /**
   * Инициализирует модель данных выбранными данными
   */
  init = async (payload: DatesSelectionType): Promise<void> => {
    // todo для barchart
    // if (this._meta.isLoading || this._meta.isLoaded || !this._isLast7DaysMode) {
    if (this._meta.isLoading || this._initialized) {
      return;
    }

    this._meta.setLoading();

    // todo для barchart
    // const [startDate, finishData] = this.last7DaysRange;
    //
    // const nowString = formZeroISOStringFromTimestamp(startDate.valueOf());
    //
    // const sevenDaysPast = formZeroISOStringFromTimestamp(finishData.valueOf());
    //
    // const loaded = await this._load(nowString, sevenDaysPast);

    await this._onSetDates(payload);

    // todo проверка на loaded

    // runInAction(() => {
    //   this._rawData = loaded;
    // });
  };

  /**
   * Подготавливает данные для загрузки и отдаёт загруженные данные.
   * (Столбчатый график грузит только по диапазону)
   */
  private _onSetDates = async ({
    selectionType,
    value,
  }: DatesSelectionType): Promise<BarChartRawDataType | null> => {
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
  };

  /**
   * Обработчик выбора даты
   */
  onSelectDates = async (payload: DatesSelectionType): Promise<void> => {
    if (this._meta.isLoading) {
      return;
    }

    const loaded = await this._onSetDates(payload);

    if (!loaded) {
      this._meta.setError();
      return;
    }

    runInAction(() => {
      this._rawData = loaded;
      this._meta.setNotLoading();
    });
  };
}

export default BarChartModel;
