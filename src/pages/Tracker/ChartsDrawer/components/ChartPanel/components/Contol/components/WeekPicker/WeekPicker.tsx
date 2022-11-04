import * as React from 'react';
import { Relative } from '../ui';
// todo стили
import { StyledDatePicker } from '../DatePicker/DatePicker.styles';
import locale from 'antd/es/date-picker/locale/ru_RU';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { Moment } from 'moment';

type Props = {
  onPick?: (moment: null | Moment) => void;
};

const WeekPicker: React.FC<Props> = ({ onPick }) => {
  const [opened, setOpened] = React.useState(false);

  const toggleOpened = React.useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return (
    <Relative>
      <StyledDatePicker
        open={opened}
        onOpenChange={toggleOpened}
        onChange={onPick}
        locale={locale}
        picker="week"
      />
      <IconButton
        image={images.datesCalendarBrown.default}
        onClick={toggleOpened}
        squareSide="28px"
        paddings="0"
      />
    </Relative>
  );
};

export default React.memo(WeekPicker);
