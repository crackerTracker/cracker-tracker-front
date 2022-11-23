import {
  getInitialBarChartSelection,
  LAST_7_DAYS_TEXT,
} from '../../../../config';
import { makeAutoObservable } from 'mobx';
import { DatesSelectionTypesEnum } from '../../../../types';
import formatDatesRange from '../../../../../../../utils/formatDatesRange';
import BarChartModel from '../BarChartModel';
import { BarChartSelectionType } from './types';
import PieChartModel from '../PieChartModel';

/**
 * Контроллер столбчатого графика. Слой между управляющими элементами
 * и моделью данных, которая загружает данные и подготавливает конфиг для графика
 */
class BarChartController {
  /**
   * Модель данных графика. Занимается загрузкой данных и подготовкой конфига
   */
  private readonly _barChartModel: BarChartModel = new BarChartModel();

  /**
   * Выбранная дата
   */
  private _selectedDate: BarChartSelectionType = getInitialBarChartSelection();

  constructor() {
    makeAutoObservable(this);
  }

  get barChartModel(): BarChartModel {
    return this._barChartModel;
  }

  /**
   * Выбранная дата в виде текста:
   * * Если выбрана опция "За последние 7 дней", отдастся этот текст
   * * Если выбран диапазон дат, отдастся отформатированная строка диапазона
   */
  get selectedDateTitle(): string {
    const { selection, isLast7DaysMode } = this._selectedDate;

    if (isLast7DaysMode) {
      return LAST_7_DAYS_TEXT;
    }

    const { value: selectedDatesValue, selectionType } = selection;

    if (
      selectionType === DatesSelectionTypesEnum.single ||
      !selectedDatesValue
    ) {
      return ''; // В столбчатом графике можно выбирать только диапазон дат
    }

    const [startDate, endDate] = selectedDatesValue;

    if (
      selectionType === DatesSelectionTypesEnum.range &&
      startDate &&
      endDate
    ) {
      return formatDatesRange([startDate, endDate]);
    }

    return '';
  }

  selectDate = async (dateSelection: BarChartSelectionType): Promise<void> => {
    if (!this._barChartModel.initialized) {
      return;
    }

    this._selectedDate = dateSelection;
    await this._barChartModel.onSelectDates(dateSelection.selection);
  };

  /**
   * Инициализирует модель графика начальными значениями контроллера
   */
  initModel = async (): Promise<void> => {
    if (this._barChartModel.initialized) {
      return;
    }

    await this._barChartModel.init(this._selectedDate.selection);
  };
}

export default BarChartController;
