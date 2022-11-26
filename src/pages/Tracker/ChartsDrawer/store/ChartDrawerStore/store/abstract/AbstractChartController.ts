import AbstractChartModel from './AbstractChartModel';
import { ChartDatesBaseSelectionType } from '../../../../types';
import { action, computed, makeObservable, observable, toJS } from 'mobx';
import { ChartType } from 'chart.js';

type PrivateFields = '_chartModel' | '_selectedDate';

abstract class AbstractChartController<
  ChartModelT extends AbstractChartModel<any, any, any, any>,
  ChartSelectionT extends ChartDatesBaseSelectionType
> {
  protected readonly _chartModel: ChartModelT;

  protected _selectedDate: ChartSelectionT;

  protected constructor(
    chartModelCreator: () => ChartModelT,
    initialSelectionGetter: () => ChartSelectionT
  ) {
    this._chartModel = chartModelCreator();
    this._selectedDate = initialSelectionGetter();

    makeObservable<this, PrivateFields>(this, {
      _chartModel: observable.ref,
      _selectedDate: observable,

      chartModel: computed,

      selectDate: action.bound,
      initModel: action.bound,
    });
  }

  get chartModel(): ChartModelT {
    return this._chartModel;
  }

  get isModelLoading(): boolean {
    return this._chartModel.initializing || this._chartModel.meta.isLoading;
  }

  /**
   * Выбранная дата в виде текста
   */
  abstract get selectedDateTitle(): string;

  async selectDate(dateSelection: ChartSelectionT): Promise<void> {
    if (!this._chartModel.initialized) {
      return;
    }

    this._selectedDate = dateSelection;
    await this._chartModel.onSelectDates(dateSelection.selection);
  }

  /**
   * Инициализирует модель графика начальными значениями контроллера
   */
  async initModel(): Promise<void> {
    if (this._chartModel.initialized) {
      return;
    }

    await this._chartModel.init(this._selectedDate.selection);
  }
}

export default AbstractChartController;
