import * as React from 'react';
import { StyledDatePicker } from './DatePicker.styles';
import { images } from 'img/icons';
import IconButton from 'components/IconButton';
import { Relative } from '../ui';
import { Moment } from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

type Props = {
  onPick?: (moment: null | Moment) => void;
};

const DatePicker: React.FC<Props> = ({ onPick }) => {
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

export default React.memo(DatePicker);
