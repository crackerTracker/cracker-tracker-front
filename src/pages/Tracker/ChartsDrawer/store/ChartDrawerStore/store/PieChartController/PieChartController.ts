import { makeAutoObservable } from 'mobx';
import {
  getInitialPieChartSelection,
  simpleDatesTexts,
} from '../../../../config';
import { DatesSelectionTypesEnum } from '../../../../types';
import { CAPITAL_L_MOMENT_FORMAT } from '../../../../../../../config/ui';
import formatDatesRange from '../../../../../../../utils/formatDatesRange';
import { PieChartSelectionType } from './types';
import { Moment } from 'moment';
import PieChartModel from '../PieChartModel';

/**
 * Контроллер графика - слой между управляющими элементами и моделью данных
 */
class PieChartController {
  /**
   * Модель данных графика. Занимается загрузкой данных и подготовкой конфига
   */
  private readonly _pieChartModel: PieChartModel = new PieChartModel();

  /**
   * Выбранная дата
   */
  private _selectedDate: PieChartSelectionType = getInitialPieChartSelection();

  constructor() {
    makeAutoObservable(this);
  }

  get pieChartModel(): PieChartModel {
    return this._pieChartModel;
  }

  /**
   * Выбранная дата в виде текста:
   * * Если дата выбрана с помощью селектора дат, отдастся текст опции
   * * Если выбран один день или диапазон, отдастся отформатированная строка
   */
  get selectedDateTitle(): string {
    const { simpleDate, dateSelection } = this._selectedDate;

    if (simpleDate) {
      return simpleDatesTexts[simpleDate];
    }

    const { value: selectedDateValue, selectionType } = dateSelection;

    if (selectionType === DatesSelectionTypesEnum.single) {
      return selectedDateValue.format(CAPITAL_L_MOMENT_FORMAT);
    }

    if (!selectedDateValue) {
      return '';
    }

    const [startDate, endDate] = selectedDateValue;

    if (
      selectionType === DatesSelectionTypesEnum.range &&
      startDate &&
      endDate
    ) {
      return formatDatesRange([startDate, endDate]);
    }

    return '';
  }

  selectDate = async (dateSelection: PieChartSelectionType): Promise<void> => {
    if (!this._pieChartModel.initialized) {
      return;
    }

    this._selectedDate = dateSelection;
    await this._pieChartModel.onSelectDates(dateSelection.dateSelection);
  };

  /**
   * Инициализирует модель графика начальными значениями контроллера
   */
  initModel = async (): Promise<void> => {
    if (this._pieChartModel.initialized) {
      return;
    }

    await this._pieChartModel.init(this._selectedDate.dateSelection);
  };
}

export default PieChartController;
