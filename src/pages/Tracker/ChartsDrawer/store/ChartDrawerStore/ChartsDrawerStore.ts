import { TrackerChartsEnum } from '../../config';
import { action, computed, makeObservable, observable } from 'mobx';
import { ChartsDrawerStorePrivateFieldsToAnnotate } from './config';
import PieChartController from './store/PieChartController/PieChartController';
import BarChartController from './store/BarChartContoller/BarChartController';

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
    makeObservable<this, ChartsDrawerStorePrivateFieldsToAnnotate>(this, {
      _chartType: observable,

      chartType: computed,
      isPieChart: computed,

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
      !this._pieChartController.pieChartModel.initialized
    ) {
      await this._pieChartController.initModel();
    }

    if (
      chartType === TrackerChartsEnum.bar &&
      !this._barChartController.barChartModel.initialized
    ) {
      await this._barChartController.initModel();
    }
  };
}

export default ChartsDrawerStore;
