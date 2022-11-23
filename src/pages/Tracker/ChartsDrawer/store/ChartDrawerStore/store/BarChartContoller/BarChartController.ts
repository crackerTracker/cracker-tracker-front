import {
  getInitialBarChartSelection,
  LAST_7_DAYS_TEXT,
} from '../../../../config';
import { computed, makeObservable } from 'mobx';
import { DatesSelectionTypesEnum } from '../../../../types';
import formatDatesRange from 'utils/formatDatesRange';
import BarChartModel from './BarChartModel';
import { BarChartSelectionType } from './types';
import { AbstractChartController } from '../abstract';

/**
 * Контроллер столбчатого графика. Слой между управляющими элементами
 * и моделью данных, которая загружает данные и подготавливает конфиг для графика
 */
class BarChartController extends AbstractChartController<
  BarChartModel,
  BarChartSelectionType
> {
  constructor() {
    super(() => new BarChartModel(), getInitialBarChartSelection);
    makeObservable(this, {
      selectedDateTitle: computed,
    });
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
}

export default BarChartController;
