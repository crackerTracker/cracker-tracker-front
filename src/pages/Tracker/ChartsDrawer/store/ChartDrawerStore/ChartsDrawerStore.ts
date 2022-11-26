import { TrackerChartsEnum } from '../../config';
import { action, computed, makeObservable, observable } from 'mobx';
import { PieChartController } from './store/PieChartController';
import { BarChartController } from './store/BarChartContoller';

export type PrivateFields = '_chartType' | '_setChartType';

class ChartsDrawerStore {
  /**
   * Тип отображаемого в данный момент графика
   */
  private _chartType = TrackerChartsEnum.pie;

  private readonly _pieChartController: PieChartController =
    new PieChartController();

  private readonly _barChartController: BarChartController =
    new BarChartController();

  // private _barChartStore: BarChartStore;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _chartType: observable,

      chartType: computed,
      isPieChart: computed,
      toShowLoader: computed,
      toShowNoData: computed,

      _setChartType: action,
      onChangeChartType: action,
    });
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
          !this._pieChartController.chartModel.formattedCategoriesList
        : this._barChartController.chartModel.initialized &&
          !this._barChartController.chartModel.formattedCategoriesList)
    );
  }

  // todo возможно, не понадобится
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
}

export default ChartsDrawerStore;
