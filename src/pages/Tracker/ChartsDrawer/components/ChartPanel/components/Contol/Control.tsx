import * as React from 'react';
import { Moment } from 'moment';
import { observer } from 'mobx-react-lite';
import SimpleDatesSelector from './components/SimpleDatesSelector';
import DatePicker from './components/DatePicker';
import { NoShrink, NoShrinkRow } from './Control.styles';
import { RangeValue } from 'rc-picker/lib/interface';
import RangePicker from './components/RangePicker';
import { BAR_CHART_MAX_CHOOSING_DAYS } from 'pages/Tracker/ChartsDrawer/config';
import { useChartsDrawerStore } from 'pages/Tracker/ChartsDrawer/store';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { CHART_DRAWER_CALENDAR_ICON_SIZE } from './uiConfig';
import { DatesTitle } from './components/ui';
import { DatesSelectionType, DatesSelectionTypesEnum } from '../../../../types';

// todo выбор "за последние 7 дней"
const Control: React.FC = () => {
  const {
    isPieChart,
    pieChartController: {
      selectDate: selectPieChartDate,
      selectedDateTitle: pieChartSelectedDateTitle,
      simpleDatesOptionsGetter,
    },
    barChartController: {
      selectDate: selectBarChartDate,
      selectedDateTitle: barChartSelectedDateTitle,
      selectLast7Days: barChartSelectLast7Days,
    },
  } = useChartsDrawerStore();

  const onPickDate = async (date: Moment | null) => {
    if (!date) {
      return;
    }

    const selection: DatesSelectionType = {
      selectionType: DatesSelectionTypesEnum.single,
      value: date,
    };

    if (isPieChart) {
      await selectPieChartDate({
        simpleDate: null,
        selection,
      });
      return;
    }

    await selectBarChartDate({
      isLast7DaysMode: false,
      selection,
    });
  };

  const onPickRange = async (dates: RangeValue<Moment>) => {
    const startDate = dates?.[0];
    const endDate = dates?.[1];

    if (!startDate || !endDate) {
      return;
    }

    const selection: DatesSelectionType = {
      selectionType: DatesSelectionTypesEnum.range,
      value: [startDate, endDate],
    };

    if (isPieChart) {
      await selectPieChartDate({
        simpleDate: null,
        selection,
      });
      return;
    }

    await selectBarChartDate({
      isLast7DaysMode: false,
      selection,
    });
  };

  return (
    <NoShrinkRow justify="space-between">
      {isPieChart ? (
        <SimpleDatesSelector
          optionsGetter={simpleDatesOptionsGetter}
          selected={pieChartSelectedDateTitle}
        />
      ) : (
        <DatesTitle>{barChartSelectedDateTitle}</DatesTitle>
      )}

      <NoShrink>
        {isPieChart ? (
          <>
            <DatePicker onPick={onPickDate} />
            <RangePicker onPick={onPickRange} />
          </>
        ) : (
          <>
            <RangePicker
              onPick={onPickRange}
              maxDaysToSelect={BAR_CHART_MAX_CHOOSING_DAYS}
            />
            <IconButton
              image={images.calendarWithClockBrown.default}
              squareSide={CHART_DRAWER_CALENDAR_ICON_SIZE}
              paddings="0"
              onClick={barChartSelectLast7Days}
            />
          </>
        )}
      </NoShrink>
    </NoShrinkRow>
  );
};

export default observer(Control);
