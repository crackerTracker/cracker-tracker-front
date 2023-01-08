import { computed, makeObservable } from 'mobx';

import {
  getInitialBarChartSelection,
  LAST_7_DAYS_TEXT,
} from 'pages/Tracker/ChartsDrawer/config';
import {
  DatesSelectionTypesEnum,
  BarChartSelectionType,
} from 'pages/Tracker/ChartsDrawer/types';
import formatDatesRange from 'utils/formatDatesRange';
import getLastDaysRange from 'utils/getLastDaysRange';
import { DAYS_IN_WEEK } from 'config/time';
import RootStore from 'stores/RootStore';

import BarChartModel from './BarChartModel';
import { AbstractChartController } from '../abstract';

/**
 * Контроллер столбчатого графика. Слой между управляющими элементами
 * и моделью данных, которая загружает данные и подготавливает конфиг для графика
 */
class BarChartController extends AbstractChartController<
  BarChartModel,
  BarChartSelectionType
> {
  constructor(rootStore: RootStore) {
    super(() => new BarChartModel(rootStore), getInitialBarChartSelection);
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

  selectLast7Days = async () => {
    await this.selectDate({
      isLast7DaysMode: true,
      selection: {
        selectionType: DatesSelectionTypesEnum.range,
        value: getLastDaysRange(DAYS_IN_WEEK),
      },
    });
  };
}

export default BarChartController;
