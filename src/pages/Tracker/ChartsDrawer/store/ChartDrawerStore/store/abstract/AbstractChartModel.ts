import MetaModel from 'stores/models/MetaModel';
import {
  DatesSelectionType,
  PercentStatsCategoryType,
} from '../../../../types';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DatesStringSelectionType } from '../types';

type ProtectedFields = '_chartOptions' | '_meta' | '_initialized' | '_rawData';

abstract class AbstractChartModel<RawDataT, ChartDataConfigT, ChartOptionT> {
  /**
   * Конфиг опций графика. Кладётся в пропс options графика
   */
  protected readonly _chartOptions: ChartOptionT;

  /**
   * Состояние загрузки
   */
  protected readonly _meta: MetaModel = new MetaModel();

  /**
   * Проинициализирована ли модель
   */
  protected _initialized = false;

  /**
   * Список загруженных категорий для статистики
   */
  protected _rawData: RawDataT | null = null;

  protected constructor(chartDataOptions: ChartOptionT) {
    makeObservable<this, ProtectedFields>(this, {
      _chartOptions: observable.ref,
      _meta: observable,
      _initialized: observable,
      _rawData: observable,

      meta: computed,
      initialized: computed,

      onSelectDates: action.bound,
    });

    this._chartOptions = chartDataOptions;
  }

  get meta(): MetaModel {
    return this._meta;
  }

  get initialized(): boolean {
    return this._initialized;
  }

  /**
   * Создаёт конфиг данных
   */
  abstract get chartDataConfig(): ChartDataConfigT | null;

  /**
   * Массив категорий для отображения
   */
  abstract get formattedCategoriesList(): PercentStatsCategoryType[] | null;

  /**
   * Загружает и нормализует данные. Принимает в качестве значения выбранных
   * дат строки с нулями на месте часов, минут, секунд и миллисекунд
   */
  protected abstract _load(
    selection: DatesStringSelectionType
  ): Promise<RawDataT | null>;

  /**
   * Инициализирует модель данных выбранными данными
   */
  abstract init(payload: DatesSelectionType): Promise<void>;

  /**
   * Подготавливает данные для загрузки и отдаёт загруженные данные
   * (использует this._load)
   */
  protected abstract _onSetDates(
    selection: DatesSelectionType
  ): Promise<RawDataT | null>;

  /**
   * Обработчик выбора даты
   */
  async onSelectDates(payload: DatesSelectionType): Promise<void> {
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
  }
}

export default AbstractChartModel;