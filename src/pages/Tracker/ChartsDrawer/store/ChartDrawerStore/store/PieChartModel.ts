import {
  DatesSelectionType,
  DatesSelectionTypesEnum,
  formPercentStatsCategories,
  formPieChartDataConfig,
  normalizeStatsCategory,
  PercentStatsCategoryType,
  PieChartDataType,
  PieChartOptionsType,
  StatsCategoryType,
} from '../../../types';
import { makeAutoObservable, runInAction } from 'mobx';
import mockRequest from 'utils/mockRequest';
import { mockApiPieChartData } from '../../../mock';
import MetaModel from 'stores/models/MetaModel';
import { PIE_CHART_OPTIONS } from '../../../config';
import { DatesStringSelectionType } from './types';
import formZeroISOStringFromTimestamp from 'utils/formZeroISOStringFromTimestamp';

/**
 * Модель данных кругового графика. Загружает данные
 * и подготовливает конфиг графика
 */
class PieChartModel {
  /**
   * Конфиг опций графика. Кладётся в пропс options графика
   */
  private readonly _chartOptions: PieChartOptionsType;

  /**
   * Состояние загрузки
   */
  private readonly _meta: MetaModel = new MetaModel();

  /**
   * Проинициализирована ли модель
   */
  private _initialized = false;

  /**
   * Список загруженных категорий для статистики
   */
  private _rawData: StatsCategoryType[] | null = null;

  // private _isLast7DaysMode = true; // todo для barchart

  constructor(chartDataOptions = PIE_CHART_OPTIONS) {
    makeAutoObservable(this);

    this._chartOptions = chartDataOptions;
  }

  // todo для barchart
  // get isLast7DaysMode(): boolean {
  //   return this._isLast7DaysMode;
  // }

  get meta(): MetaModel {
    return this._meta;
  }

  get initialized(): boolean {
    return this._initialized;
  }

  // todo для barchart
  // get last7DaysRange(): [Moment, Moment] {
  //   return [moment(), moment().subtract(DAYS_IN_WEEK - 1, 'days')];
  // }

  /**
   * Создаёт конфиг данных для кругового графика
   */
  get chartDataConfig(): PieChartDataType | null {
    if (!this._rawData) {
      return null;
    }

    return formPieChartDataConfig(this._rawData);
  }

  /**
   * Сумма потраченных минут за все имеющиеся категории
   */
  private get _sumSpentMinutes(): number {
    if (!this._rawData) {
      return 0;
    }

    return this._rawData.reduce(
      (sum, { minutesSpent }) => sum + minutesSpent,
      0
    );
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStatsCategoryType[] | null {
    if (!this._rawData) {
      return null;
    }

    return formPercentStatsCategories(
      this._rawData.sort((a, b) => a.minutesSpent - b.minutesSpent),
      this._sumSpentMinutes
    );
  }

  /**
   * Загружает и нормализует данные. Принимает в качестве значения выбранных
   * дат строки с нулями на месте часов, минут, секунд и миллисекунд
   */
  private _load = async ({
    selectionType,
    value,
  }: DatesStringSelectionType): Promise<StatsCategoryType[] | null> => {
    if (this._meta.isLoading) {
      return null;
    }

    this._meta.setLoading();

    await mockRequest();

    // todo проверка

    return mockApiPieChartData.map(normalizeStatsCategory);
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
   * Подготавливает данные для загрузки и отдаёт загруженные данные
   */
  private _onSetDates = async ({
    selectionType,
    value,
  }: DatesSelectionType): Promise<StatsCategoryType[] | null> => {
    if (selectionType === DatesSelectionTypesEnum.single) {
      return await this._load({
        selectionType,
        value: formZeroISOStringFromTimestamp(value.valueOf()),
      });
    }

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

export default PieChartModel;
