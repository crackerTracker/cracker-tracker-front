import { computed, makeObservable } from 'mobx';
import {
  getInitialPieChartSelection,
  simpleDatesTexts,
} from '../../../../config';
import { DatesSelectionTypesEnum } from '../../../../types';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import formatDatesRange from 'utils/formatDatesRange';
import { PieChartSelectionType } from './types';
import PieChartModel from './PieChartModel';
import { AbstractChartController } from '../abstract';

/**
 * Контроллер графика - слой между управляющими элементами и моделью данных
 */
class PieChartController extends AbstractChartController<
  PieChartModel,
  PieChartSelectionType
> {
  constructor() {
    super(() => new PieChartModel(), getInitialPieChartSelection);
    makeObservable(this, {
      selectedDateTitle: computed,
    });
  }

  /**
   * Выбранная дата в виде текста:
   * * Если дата выбрана с помощью селектора дат, отдастся текст опции
   * * Если выбран один день или диапазон, отдастся отформатированная строка
   */
  get selectedDateTitle(): string {
    const { simpleDate, selection } = this._selectedDate;

    if (simpleDate) {
      return simpleDatesTexts[simpleDate];
    }

    const { value: selectedDateValue, selectionType } = selection;

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
}

export default PieChartController;
