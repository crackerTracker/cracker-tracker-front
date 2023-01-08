import { action, computed, makeObservable, observable } from 'mobx';

import { TrackerChartsEnum } from 'pages/Tracker/ChartsDrawer/config';
import RootStore from 'stores/RootStore';

import { BarChartController, PieChartController } from './store';

export type PrivateFields =
  | '_chartType'
  | '_setChartType'
  | '_resetChart'
  | '_pieChartController'
  | '_barChartController';

class ChartsDrawerStore {
  private readonly _rootStore: RootStore;

  /**
   * Тип отображаемого в данный момент графика
   */
  private _chartType = TrackerChartsEnum.pie;

  private _pieChartController: PieChartController;

  private _barChartController: BarChartController;

  constructor(rootStore: RootStore) {
    makeObservable<this, PrivateFields>(this, {
      _chartType: observable,
      _pieChartController: observable.ref,
      _barChartController: observable.ref,

      chartType: computed,
      isPieChart: computed,
      toShowLoader: computed,
      toShowNoData: computed,
      toShowError: computed,

      _setChartType: action,
      onChangeChartType: action,
      _resetChart: action,
    });

    this._rootStore = rootStore;
    this._pieChartController = new PieChartController(rootStore);
    this._barChartController = new BarChartController(rootStore);
  }

  get chartType(): TrackerChartsEnum {
    return this._chartType;
  }

  get isPieChart(): boolean {
    return this._chartType === TrackerChartsEnum.pie;
  }

  get pieChartController(): PieChartController {
    return this._pieChartController;
  }

  get barChartController(): BarChartController {
    return this._barChartController;
  }

  get toShowLoader(): boolean {
    return this.isPieChart
      ? this._pieChartController.isModelLoading
      : this._barChartController.isModelLoading;
  }

  /**
   * Показывать ли уведомление об остутствии данных.
   * Показываем уведомление, если
   * * В это же время не нужно показывать лоадер и данные не грузятся и
   * * Модель проинициализирована и данных действительно нет
   * (наличие данных проверяется по списку категорий)
   */
  get toShowNoData(): boolean {
    return (
      !this.toShowLoader &&
      (this.isPieChart
        ? this._pieChartController.chartModel.initialized &&
          !this._pieChartController.chartModel.formattedCategoriesList.length
        : this._barChartController.chartModel.initialized &&
          !this._barChartController.chartModel.formattedCategoriesList.length)
    );
  }

  get toShowError(): boolean {
    return (
      !this.toShowLoader &&
      !this.toShowNoData &&
      (this.isPieChart
        ? this._pieChartController.chartModel.meta.isError
        : this._barChartController.chartModel.meta.isError)
    );
  }

  private _setChartType = (value: TrackerChartsEnum): void => {
    this._chartType = value;
  };

  /**
   * Производит оперции по смене типа графика
   * @param chartType тип графика, на который меняем
   */
  onChangeChartType = async (chartType: TrackerChartsEnum): Promise<void> => {
    this._setChartType(chartType);

    if (
      chartType === TrackerChartsEnum.pie &&
      !this._pieChartController.chartModel.initialized
    ) {
      await this._pieChartController.initModel();
    }

    if (
      chartType === TrackerChartsEnum.bar &&
      !this._barChartController.chartModel.initialized
    ) {
      await this._barChartController.initModel();
    }
  };

  private _resetChart = (chartType: TrackerChartsEnum): void => {
    chartType === TrackerChartsEnum.pie
      ? (this._pieChartController = new PieChartController(this._rootStore))
      : (this._barChartController = new BarChartController(this._rootStore));
  };

  handleChangeVisibility = (isVisible: boolean) => {
    if (isVisible) {
      this.isPieChart
        ? this._pieChartController.initModel()
        : this._barChartController.initModel();

      return;
    }

    // Если у текущего выбранного графика при закрытии не было данных
    // для отображения (из-за ошибки или потому, что просто не было
    // что отображать), сбросить график, чтобы его можно было
    // повторно инициализировать при следующем открытии
    if (this.toShowNoData || this.toShowError) {
      this._resetChart(this._chartType);
    }
  };
}

export default ChartsDrawerStore;
