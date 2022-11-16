import { TrackerChartsEnum } from '../../config';
import { action, computed, makeObservable, observable } from 'mobx';
import { ChartsDrawerStorePrivateFieldsToAnnotate } from './config';

class ChartsDrawerStore {
  /**
   * Тип отображаемого в данный момент графика
   */
  private _chartType = TrackerChartsEnum.pie;

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
  onChangeChartType = (chartType: TrackerChartsEnum): void => {
    this._setChartType(chartType);
  };
}

export default ChartsDrawerStore;
