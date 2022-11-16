import { Menu } from 'antd';
import * as React from 'react';
import moment, { Moment } from 'moment';
import { observer } from 'mobx-react-lite';
import SimpleDatesSelector from './components/SimpleDatesSelector';
import DatePicker from './components/DatePicker';
import { NoShrink, NoShrinkRow } from './Control.styles';
import { RangeValue } from 'rc-picker/lib/interface';
import RangePicker from './components/RangePicker';
import {
  BAR_CHART_MAX_CHOOSING_DAYS,
  SimpleDatesEnum,
  simpleDatesOrder,
  simpleDatesTexts,
} from 'pages/Tracker/ChartsDrawer/config';
import { useChartsDrawerStore } from 'pages/Tracker/ChartsDrawer/store/ChartDrawerStore/context';
import { CAPITAL_L_MOMENT_FORMAT } from 'config/ui';
import formatDatesRange from 'utils/formatDatesRange';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { CHART_DRAWER_CALENDAR_ICON_SIZE } from './uiConfig';
import { DAYS_IN_WEEK } from 'config/time';
import { DatesTitle } from './components/ui';

// todo выбор "за последние 7 дней"
const Control: React.FC = () => {
  const { isPieChart } = useChartsDrawerStore();

  /**
   * Выбран ли сейчас режим отображения статистики "За последние 7 дней"
   */
  const [last7DaysMode, setLast7DaysMode] = React.useState(true);

  const onClickLast7Days = () => {
    setLast7DaysMode(true);
  };

  /**
   * Вычислемое значение диапазона последних 7 дней:
   * текущая дата и дата на 6 дней позже
   * (6 дней, так как текущий день включается в диапазон)
   */
  // const last7DaysRange = React.useMemo(
  //   () =>
  //     last7DaysMode
  //       ? [moment(), moment().subtract(DAYS_IN_WEEK - 1, 'days')]
  //       : null,
  //   [last7DaysMode]
  // );

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

    if (!startDate || !endDate) {
      return;
    }

    setSelectedDateTitle(formatDatesRange([startDate, endDate]));

    // Если текущий тип графика - столбчатый,
    // выйти из режима отображения статистики за последние 7 дней
    if (!isPieChart) {
      setLast7DaysMode(false);
    }
  };

  return (
    <NoShrinkRow justify="space-between">
      {isPieChart ? (
        <SimpleDatesSelector
          optionsGetter={optionsGetter}
          selected={selectedDateTitle}
        />
      ) : (
        <DatesTitle>
          {last7DaysMode ? 'За последние 7 дней' : selectedDateTitle}
        </DatesTitle>
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
              onClick={onClickLast7Days}
            />
          </>
        )}
      </NoShrink>
    </NoShrinkRow>
  );
};

export default observer(Control);
