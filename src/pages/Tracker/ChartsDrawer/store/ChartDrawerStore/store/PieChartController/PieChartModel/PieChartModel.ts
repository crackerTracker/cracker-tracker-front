import { action, computed, makeObservable, runInAction } from 'mobx';

import { request } from 'utils/request';
import { endpoints } from 'config/endpoints';
import { getAuthHeader } from 'utils/getAuthHeader';
import RootStore from 'stores/RootStore';
import { USA_MINUS_DATE_FORMAT } from 'config/dates';
import {
  DatesSelectionType,
  DatesSelectionTypesEnum,
  normalizeStatsCategory,
  OthersCategoriesItemType,
  PercentStringStatsCategoryType,
  PieChartDataType,
  PieChartOptionsType,
  StatsCategoryType,
  DatesStringSelectionType,
  StatisticsRequestDatesType,
  ApiStatsCategoryType,
} from 'pages/Tracker/ChartsDrawer/types';
import {
  formPercentStatsCategories,
  formPieChartDataConfig,
  OthersExtendedPercentStatsCategoriesType,
} from 'pages/Tracker/ChartsDrawer/utils';
import {
  PIE_CHART_OPTIONS,
  TrackerChartsEnum,
} from 'pages/Tracker/ChartsDrawer/config';

import AbstractChartModel from '../../abstract/AbstractChartModel';

type PrivateFields =
  | '_sumSpentMinutes'
  | '_load'
  | '_onSetDates'
  | '_formattedCategoriesWithOthers';

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
  constructor(rootStore: RootStore, chartDataOptions = PIE_CHART_OPTIONS) {
    super(rootStore, chartDataOptions);
    makeObservable<this, PrivateFields>(this, {
      chartDataConfig: computed,
      _sumSpentMinutes: computed,
      _formattedCategoriesWithOthers: computed,
      formattedCategoriesList: computed,
      othersCategories: computed,

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

  /**
   * Отформатированные для отображения в списке категории вместе с блоком "другое"
   */
  private get _formattedCategoriesWithOthers(): OthersExtendedPercentStatsCategoriesType | null {
    if (!this._rawData) {
      return null;
    }

    return formPercentStatsCategories(this._rawData, this._sumSpentMinutes);
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStringStatsCategoryType[] {
    if (!this._formattedCategoriesWithOthers) {
      return [];
    }

    return this._formattedCategoriesWithOthers.categories;
  }

  /**
   * Блок "другое"
   */
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
  protected async _load({
    selectionType,
    value,
  }: DatesStringSelectionType): Promise<StatsCategoryType[] | null> {
    if (this._meta.isLoading) {
      return null;
    }

    try {
      this._meta.setLoading();

      const datesRequestBody: StatisticsRequestDatesType =
        selectionType === DatesSelectionTypesEnum.single
          ? {
              start: value,
            }
          : {
              start: value[0],
              end: value[1],
            };

      const response: ApiStatsCategoryType[] = await request({
        ...endpoints.getStatistics,
        headers: getAuthHeader(this._rootStore.authStore.token),
        body: {
          type: TrackerChartsEnum.pie,
          ...datesRequestBody,
        },
      });

      // Проверить, не прислал ли сервер некорректные данные
      if (!Array.isArray(response) && !response) {
        this._meta.setError();
        return null;
      }

      const normalized = response.map(normalizeStatsCategory);

      this._meta.setNotLoading();

      return normalized;
    } catch (e) {
      console.log('PieCharModel._load error', e);
    }

    return null;
  }

  /**
   * Инициализирует модель данных выбранными данными
   */
  async init(payload: DatesSelectionType): Promise<void> {
    if (this._meta.isLoading || this._initialized || this._initializing) {
      return;
    }

    this._initializing = true;

    const loaded = await this._onSetDates(payload);

    runInAction(() => {
      if (loaded === null) {
        this._rawData = null;
        this._initialized = false;
      } else {
        this._rawData = loaded;
        this._initialized = true;
      }

      this._initializing = false;
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
        value: value.utc().format(USA_MINUS_DATE_FORMAT),
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
          startDate.utc().format(USA_MINUS_DATE_FORMAT),
          endDate.utc().format(USA_MINUS_DATE_FORMAT),
        ],
      });
    }

    this._meta.setError();
    return null;
  }
}

export default PieChartModel;
