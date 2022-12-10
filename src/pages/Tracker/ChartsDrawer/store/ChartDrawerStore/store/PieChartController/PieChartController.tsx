import { Menu } from 'antd';
import * as React from 'react';
import { computed, makeObservable } from 'mobx';
import RootStore from 'stores/RootStore';

import {
  getInitialPieChartSelection,
  getSimpleDatesSelectionPayload,
  SimpleDatesEnum,
  simpleDatesOrder,
  simpleDatesTexts,
} from 'pages/Tracker/ChartsDrawer/config';
import {
  DatesSelectionTypesEnum,
  PieChartSelectionType,
} from 'pages/Tracker/ChartsDrawer/types';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import formatDatesRange from 'utils/formatDatesRange';

import PieChartModel from './PieChartModel';
import { AbstractChartController } from '../abstract';

/**
 * Контроллер графика - слой между управляющими элементами и моделью данных
 */
class PieChartController extends AbstractChartController<
  PieChartModel,
  PieChartSelectionType
> {
  constructor(rootStore: RootStore) {
    super(() => new PieChartModel(rootStore), getInitialPieChartSelection);
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

  private _selectDateBySimpleDate = async (simpleDate: SimpleDatesEnum) => {
    await this.selectDate(getSimpleDatesSelectionPayload[simpleDate]());
  };

  // Предполагается, что closeDropdownCallback будет приходить извне,
  // от использующего этот геттер компонента, контролирующего состояние
  // выпадающего списка
  simpleDatesOptionsGetter = (closeDropdownCallback: VoidFunction) => (
    <Menu>
      {simpleDatesOrder.map((simpleDate) => (
        <Menu.Item
          key={simpleDate}
          // Без useCallback, так как в данном случае нецелесообразно
          onClick={async () => {
            closeDropdownCallback();
            await this._selectDateBySimpleDate(simpleDate);
          }}
        >
          {simpleDatesTexts[simpleDate]}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default PieChartController;
