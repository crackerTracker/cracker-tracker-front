import * as React from 'react';
import { Menu } from 'antd';
import SimpleDatesSelector from './components/SimpleDatesSelector';
import DatePicker from './components/DatePicker';
import { NoShrink, NoShrinkRow } from './Control.styles';
import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import RangePicker from './components/RangePicker';
import {
  BAR_CHART_MAX_CHOOSING_DAYS,
  SimpleDatesEnum,
  simpleDatesOrder,
  simpleDatesTexts,
} from 'pages/Tracker/ChartsDrawer/config';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import formatDatesRange from 'utils/formatDatesRange';

// todo выбор "за последние 7 дней"
const Control: React.FC = () => {
  /**
   * Выбранная дата. Может быть либо SimpleDatesEnum, либо строкой, образованной
   * от произвольно выбранной даты
   */
  const [selectedDateTitle, setSelectedDateTitle] = React.useState<
    SimpleDatesEnum | string
  >(SimpleDatesEnum.today);

  const optionsGetter = React.useCallback(
    // А аргументе приходит колбэк для закрытия меню выбора
    (closeDropdownCallback: VoidFunction) => (
      <Menu>
        {simpleDatesOrder.map((simpleDate) => (
          <Menu.Item
            key={simpleDate}
            // Без useCallback, так как в данном случае нецелесообразно
            onClick={() => {
              setSelectedDateTitle(simpleDate);
              closeDropdownCallback();
            }}
          >
            {simpleDatesTexts[simpleDate]}
          </Menu.Item>
        ))}
      </Menu>
    ),
    []
  );

  const onPickDate = (date: Moment | null) => {
    if (date) {
      setSelectedDateTitle(date.format(CAPITAL_L_MOMENT_FORMAT));
    }
  };

  const onPickRange = (dates: RangeValue<Moment>) => {
    const startDate = dates?.[0];
    const endDate = dates?.[1];

    if (startDate && endDate) {
      setSelectedDateTitle(formatDatesRange([startDate, endDate]));
    }
  };

  return (
    <NoShrinkRow justify="space-between">
      {/* todo если столбчатый график, вместо селектора нужно отображать лишь заголовок */}
      <SimpleDatesSelector
        optionsGetter={optionsGetter}
        selected={selectedDateTitle}
      />
      <NoShrink>
        <DatePicker onPick={onPickDate} />
        <RangePicker onPick={onPickRange} />
        <RangePicker
          onPick={onPickRange}
          maxDaysToSelect={BAR_CHART_MAX_CHOOSING_DAYS}
        />
      </NoShrink>
    </NoShrinkRow>
  );
};

export default React.memo(Control);
