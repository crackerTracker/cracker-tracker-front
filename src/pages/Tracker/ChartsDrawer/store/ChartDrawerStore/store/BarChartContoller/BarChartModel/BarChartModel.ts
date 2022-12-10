import { action, makeObservable, runInAction } from 'mobx';

import {
  BarChartDataType,
  BarChartOptionsType,
  BarChartRawDataType,
  DatesSelectionType,
  DatesSelectionTypesEnum,
  normalizeBarChartApiData,
  PercentStringStatsCategoryType,
  DatesStringSelectionType,
  BarChartApiDataType,
} from 'pages/Tracker/ChartsDrawer/types';
import {
  BAR_CHART_OPTIONS,
  TrackerChartsEnum,
} from 'pages/Tracker/ChartsDrawer/config';
import { formBarChartDataConfig } from 'pages/Tracker/ChartsDrawer/utils';
import RootStore from 'stores/RootStore';
import { request } from 'utils/request';
import { endpoints } from 'config/endpoints';
import { getAuthHeader } from 'utils/getAuthHeader';
import { USA_MINUS_DATE_FORMAT } from 'config/datesTimeFormats';

import AbstractChartModel from '../../abstract/AbstractChartModel';

type PrivateFields = '_load' | '_onSetDates';

class BarChartModel extends AbstractChartModel<
  TrackerChartsEnum,
  BarChartRawDataType,
  BarChartDataType,
  BarChartOptionsType
> {
  constructor(rootStore: RootStore, chartDataOptions = BAR_CHART_OPTIONS) {
    super(rootStore, chartDataOptions);
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
    if (!this._rawData?.minutesPerCategory.length) {
      return null;
    }

    return formBarChartDataConfig(this._rawData);
  }

  /**
   * Массив категорий для отображения
   */
  get formattedCategoriesList(): PercentStringStatsCategoryType[] {
    if (!this._rawData || !this._rawData.minutesPerCategory.length) {
      return [];
    }

    return this._rawData.minutesPerCategory.map(
      ({ categoryData }): PercentStringStatsCategoryType => categoryData
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
    if (
      this._meta.isLoading ||
      selectionType === DatesSelectionTypesEnum.single
    ) {
      return null;
    }

    try {
      this._meta.setLoading();

      const response: BarChartApiDataType = await request({
        ...endpoints.getStatistics,
        headers: getAuthHeader(this._rootStore.authStore.token),
        body: {
          type: TrackerChartsEnum.bar,
          start: value[0],
          end: value[1],
        },
      });

      // Проверить, не прислал ли сервер некорректные данные
      if (!response || !response?.days || !response?.minutesPerCategory) {
        this._meta.setError();
        return null;
      }

      const normalized = normalizeBarChartApiData(response);

      this._meta.setNotLoading();

      return normalized;
    } catch (e) {
      console.log('BarChartModel._load error', e);
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
          startDate.utc().format(USA_MINUS_DATE_FORMAT),
          endDate.utc().format(USA_MINUS_DATE_FORMAT),
        ],
      });
    }

    this._meta.setError();
    return null;
  }
}

export default BarChartModel;
