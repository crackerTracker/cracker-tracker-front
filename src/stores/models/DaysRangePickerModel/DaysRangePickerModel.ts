import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';
import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFields } from './types';

/**
 * Модель пикера диапазона дат с возможностью задать
 * ограничение на количество выбираемых дней
 */
class DaysRangePickerModel {
  /**
   * Выбранный диапазон дат - массив: 0 - стартовая дата, 1 - конечная дата
   */
  protected _value: RangeValue<Moment> = null;

  /**
   * Максимальное количество дней, которое можно выбрать.
   * Если null - ограничения нет. Конфигурирующее поле
   */
  protected readonly _maxDaysToSelect: number | null;

  constructor(maxDaysToSelect: number | null = null) {
    makeObservable<this, PrivateFields>(this, {
      _value: observable,
      value: computed,
      setValue: action.bound,
      onOpenChange: action.bound,
    });

    this._maxDaysToSelect = maxDaysToSelect;
  }

  get value(): RangeValue<Moment> {
    return this._value;
  }

  setValue(value: RangeValue<Moment>): void {
    this._value = value;
  }

  /**
   * Передаётся в проп пикера disabledDate, принимает дату и возвращает,
   * блокировать ли её
   */
  isDisabledDate = (current: Moment): boolean => {
    // Нет ограничения на дни - не блокировать дату
    if (this._maxDaysToSelect === null) {
      return false;
    }

    // Ещё не выбрано значение ни одной даты - не блокировать дату
    if (!this._value) {
      return false;
    }

    const startDate = this._value[0];
    const endDate = this._value[1];

    // Не совсем ясно, почему это работает. Взято из примера в доке antd
    const tooEarly = endDate && endDate.diff(current, 'days') > 7;
    const tooLate = startDate && current.diff(startDate, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };

  /**
   * Обработчик открытия/закрытия попапа, передаётся в проп onOpenChange пикера.
   * В качестве аргумента принимает уже изменённое состояние
   */
  onOpenChange(open: boolean): void {
    if (open) {
      this._value = [null, null];
    }
  }
}

export default DaysRangePickerModel;
