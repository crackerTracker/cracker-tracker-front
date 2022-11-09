import * as React from 'react';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';
import { observer, useLocalObservable } from 'mobx-react-lite';
import HiddenRangePickerModel from 'stores/models/HiddenRangePickerModel';
import { Relative } from '../ui';
import { AntdRangePicker } from './RangePicker.styles';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';

type Props = {
  onPick?: (value: RangeValue<Moment>) => void;
  maxDaysToSelect?: number | null;
};

const RangePicker: React.FC<Props> = ({ onPick, maxDaysToSelect = null }) => {
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
  } = useLocalObservable(() => new HiddenRangePickerModel(maxDaysToSelect));

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

export default observer(RangePicker);
