import * as React from 'react';
import { Menu } from 'antd';
import SimpleDatesSelector from './components/SimpleDatesSelector';
import DatePicker from './components/DatePicker';
import { NoShrink, NoShrinkRow } from './Control.styles';
import { Moment } from 'moment';
import WeekPicker from './components/WeekPicker';
import { RangeValue } from 'rc-picker/lib/interface';
import RangePicker from './components/RangePicker';
import {
  BAR_CHART_MAX_CHOOSING_DAYS,
  SimpleDatesEnum,
  simpleDatesOrder,
  simpleDatesTexts,
} from 'pages/Tracker/ChartsDrawer/config';

const Control: React.FC = () => {
  const [selectedSimpleDate, setSelectedSimpleDate] =
    React.useState<SimpleDatesEnum>(SimpleDatesEnum.today);

  const optionsGetter = React.useCallback(
    // А аргументе приходит колбэк для закрытия меню выбора
    (closeDropdownCallback: VoidFunction) => (
      <Menu>
        {simpleDatesOrder.map((simpleDate) => (
          <Menu.Item
            key={simpleDate}
            // Без useCallback, так как в данном случае нецелесообразно
            onClick={() => {
              setSelectedSimpleDate(simpleDate);
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

  const onPickDate = (date: Moment | null) => console.log(date);

  const onPickRange = (dates: RangeValue<Moment>) => console.log(dates);

  return (
    <NoShrinkRow justify="space-between">
      {/* todo добавить логику отображения либо селектора, либо одного заголовка */}
      {/*<DatesTitle>За последние 7 дней</DatesTitle>*/}
      <SimpleDatesSelector
        optionsGetter={optionsGetter}
        selected={selectedSimpleDate}
      />
      <NoShrink>
        <DatePicker onPick={onPickDate} />
        <WeekPicker onPick={onPickDate} />
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
