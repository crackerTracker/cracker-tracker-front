import * as React from 'react';
import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { Relative } from '../ui';
import { images } from 'img/icons';
import IconButton from 'components/IconButton';
import { AntdRangePicker } from './Days7RangePicker.styles';

/**
 * Пикер диапазона дат с ограничением в 7 дней,
 * первой датой всегда выбрается стартовая
 */
// todo отдавать наружу выбранный диапазон тогда, когда выбраны две даты
const Days7RangePicker: React.FC = () => {
  /**
   * Побочное состояние для сохранения рефа инпута стартовой даты в пикере
   */
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  /**
   * Выбранный диапазон дат - массив: 0 - стартовая дата, 1 - конечная дата
   */
  const [value, setValue] = React.useState<RangeValue<Moment>>(null);

  /**
   * Таймер для блокировки кнопки показа пикера на время анимации скрытия пикера.
   * Это же состояние в булевом представлении является показателем того,
   * нужно ли блокировать кнопку. Введён из-за сложности одновременно
   * обрабатывать открытие/закрытие пикера и нажатие на кнопку открытия
   */
  const [disableButtonTimer, setDisableButtonTimer] =
    React.useState<null | NodeJS.Timer>(null);

  React.useEffect(() => {
    setIsFirstRender(false);

    return () => {
      if (disableButtonTimer) {
        clearTimeout(disableButtonTimer);
      }
    };
  }, []);

  /**
   * Передаётся в проп пикера disabledDate, пробегает по всем датам
   * и блокирует определённые.
   * (Корректно, только если первой датой выбирается стартовая дата)
   */
  const disabledDate = (current: Moment) => {
    const startDate = value && value[0];

    if (!startDate) {
      return false;
    }

    const tooLate = current.diff(startDate, 'days') > 7;
    const tooEarly = current.isBefore(startDate);

    return tooEarly || tooLate;
  };

  /**
   * Обработчик открытия/закрытия попапа, передаётся в проп onOpenChange пикера.
   * В качестве аргумента принимает уже изменённое состояние
   */
  const onOpenChange = (open: boolean) => {
    // При открытии сбросить выбранный диапазон
    if (open) {
      setValue([null, null]);
      return;
    }

    // Заблокировать кнопку открытия на время скрытия пикера
    setDisableButtonTimer(
      setTimeout(() => {
        setDisableButtonTimer(null);
      }, 300)
    );
  };

  /**
   * Реф для поиска инпута стартовой даты,
   * чтобы вызвать программный клик на инпут
   */
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  /**
   * Реф для хранения инпута стартовой даты.
   * (На самом деле, хранится другой элемент, но нажатие на него открывает пикер
   * с выбором стартовой даты)
   */
  const startDateInputRef = React.useRef<null | HTMLElement>();

  /**
   * При первом рендере происходит установка рефа контейнера для поиска инпута,
   * при следующем - поиск в этом рефе инпута стартовой даты.
   */
  React.useEffect(() => {
    if (!isFirstRender) {
      const container = containerRef.current;

      // Сохраняем элемент как HTMLElement, так как в этом типе
      // определён метод программного клика
      startDateInputRef.current = container
        ? (container.getElementsByClassName(
            'ant-picker-range-separator'
          )[0] as HTMLElement)
        : null;
    }
  }, [isFirstRender]);

  /**
   * При нажатии на кнопку вызвать клик по инпуту выбора стартовой даты
   */
  const onClickButton = React.useCallback(() => {
    const startDateInput = startDateInputRef.current;

    if (startDateInput) {
      startDateInput.click();
    }
  }, []);

  const onCalendarChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <Relative ref={containerRef}>
      <AntdRangePicker
        value={value}
        disabledDate={disabledDate}
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

export default Days7RangePicker;
