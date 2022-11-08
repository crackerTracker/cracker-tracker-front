import * as React from 'react';
import { Relative } from '../ui';
import { images } from 'img/icons';
import IconButton from 'components/IconButton';
import { AntdRangePicker } from './Days7RangePicker.styles';
import { observer, useLocalObservable } from 'mobx-react-lite';
import HiddenRangePickerModel from 'stores/models/HiddenRangePickerModel';
import { BAR_CHART_MAX_CHOOSING_DAYS } from 'pages/Tracker/ChartsDrawer/config';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';

type Props = {
  onPick?: (value: RangeValue<Moment>) => void;
};

/**
 * Пикер диапазона дат с ограничением в 7 дней,
 * первой датой всегда выбрается стартовая.
 * В аргумент во внешний обработчик попадает
 */
const Days7RangePicker: React.FC<Props> = ({ onPick }) => {
  const {
    value,
    disableButtonTimer,
    setFirstRenderIsPassed,
    isDisabledDate,
    onOpenChange,
    destroy,
    setContainerElement,
    clickStartDateInput,
    setValue,
  } = useLocalObservable(
    () => new HiddenRangePickerModel(BAR_CHART_MAX_CHOOSING_DAYS)
  );

  const containerRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    setFirstRenderIsPassed();
    setContainerElement(containerRef.current);
    return () => destroy();
  }, []);

  const onClickButton = React.useCallback(() => {
    clickStartDateInput();
  }, []);

  const onCalendarChange = React.useCallback((value: RangeValue<Moment>) => {
    setValue(value);
    if (onPick && value?.[0] && value?.[1]) {
      onPick(value);
    }
  }, []);

  return (
    <Relative ref={containerRef}>
      <AntdRangePicker
        value={value}
        disabledDate={isDisabledDate}
        onCalendarChange={onCalendarChange}
        onOpenChange={onOpenChange}
        placement="bottomRight"
      />
      <IconButton
        image={images.datesCalendarBrown.default}
        onClick={onClickButton}
        isDisabled={!!disableButtonTimer}
        squareSide="28px"
        paddings="0"
      />
    </Relative>
  );
};

export default observer(Days7RangePicker);
