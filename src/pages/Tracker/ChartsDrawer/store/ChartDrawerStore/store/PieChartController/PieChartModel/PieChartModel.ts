import {
  DatesSelectionType,
  DatesSelectionTypesEnum,
  formPercentStatsCategories,
  formPieChartDataConfig,
  normalizeStatsCategory,
  OthersCategoriesItemType,
  OthersExtendedPercentStatsCategoriesType,
  PercentStringStatsCategoryType,
  PieChartDataType,
  PieChartOptionsType,
  StatsCategoryType,
} from '../../../../../types';
import { action, computed, makeObservable, runInAction } from 'mobx';
import mockRequest from 'utils/mockRequest';
import { mockApiPieChartData } from '../../../../../mock';
import { PIE_CHART_OPTIONS, TrackerChartsEnum } from '../../../../../config';
import { DatesStringSelectionType } from '../../types';
import formZeroISOStringFromTimestamp from 'utils/formZeroISOStringFromTimestamp';
import AbstractChartModel from '../../abstract/AbstractChartModel';

type PrivateFields = '_sumSpentMinutes' | '_load' | '_onSetDates';

/**
 * Модель данных кругового графика. Загружает данные
 * и подготовливает конфиг графика
 */
class PieChartModel extends AbstractChartModel<
  TrackerChartsEnum,
  StatsCategoryType[],
  PieChartDataType,
  PieChartOptionsType
> {
  constructor(chartDataOptions = PIE_CHART_OPTIONS) {
    super(chartDataOptions);
    makeObservable<this, PrivateFields>(this, {
      chartDataConfig: computed,
      _sumSpentMinutes: computed,
      formattedCategoriesList: computed,

      _load: action.bound, // просто для сохранения контекста
      init: action.bound,
      _onSetDates: action.bound, // просто для сохранения контекста
    });
  }

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

  private get _formattedCategoriesWithOthers(): OthersExtendedPercentStatsCategoriesType | null {
    if (!this._rawData) {
      return null;
    }

    return formPercentStatsCategories(this._rawData, this._sumSpentMinutes);
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStringStatsCategoryType[] | null {
    if (!this._formattedCategoriesWithOthers) {
      return null;
    }

    return this._formattedCategoriesWithOthers.categories;
  }

  get othersCategories(): OthersCategoriesItemType | null {
    if (!this._formattedCategoriesWithOthers) {
      return null;
    }

    return this._formattedCategoriesWithOthers.others;
  }

  /**
   * Загружает и нормализует данные. Принимает в качестве значения выбранных
   * дат строки с нулями на месте часов, минут, секунд и миллисекунд
   */
  // todo при прикрутке бэка сделать
  protected async _load({
    selectionType,
    value,
  }: DatesStringSelectionType): Promise<StatsCategoryType[] | null> {
    if (this._meta.isLoading) {
      return null;
    }

    this._meta.setLoading();

    await mockRequest();

    // todo проверка

    this._meta.setNotLoading();

    return mockApiPieChartData.map(normalizeStatsCategory);
  }

  /**
   * Инициализирует модель данных выбранными данными
   */
  // todo при прикрутке бэка сделать
  async init(payload: DatesSelectionType): Promise<void> {
    if (this._meta.isLoading || this._initialized || this._initializing) {
      return;
    }

    this._initializing = true;

    await mockRequest();

    const loaded = await this._onSetDates(payload);

    // todo проверка на loaded

    runInAction(() => {
      this._rawData = loaded ?? null;
      this._initializing = false;
      this._initialized = true;
    });
  }

  /**
   * Подготавливает данные для загрузки и отдаёт загруженные данные
   */
  protected async _onSetDates({
    selectionType,
    value,
  }: DatesSelectionType): Promise<StatsCategoryType[] | null> {
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
  }
}

export default PieChartModel;
