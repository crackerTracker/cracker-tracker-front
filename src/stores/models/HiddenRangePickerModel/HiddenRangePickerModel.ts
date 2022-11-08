import ILocalStore from 'stores/interfaces/ILocalStore';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  override,
  reaction,
  runInAction,
} from 'mobx';
import DaysRangePickerModel from 'stores/models/DaysRangePickerModel/DaysRangePickerModel';
import { DATE_PICKER_TRANSITION_MS } from 'config/ui';
import { PrivateFields } from './types';

/**
 * Модель скрытого пикера диапазона дат (когда, например, нужно скрыть пикер в кнопке).
 * Можно задать ограничение на количество выбираемых дней. При выборе дат
 * предполагает выбор стартовой даты первой, только затем - конечной.
 */
class HiddenRangePickerModel<ContainerT extends HTMLElement = HTMLDivElement>
  extends DaysRangePickerModel
  implements ILocalStore
{
  /**
   * Побочное состояние для сохранения элемента инпута стартовой даты в пикере
   */
  private _firstRenderPassed = false;

  /**
   * Таймер для блокировки кнопки показа пикера на время анимации скрытия пикера.
   * Это же состояние в булевом представлении является показателем того,
   * нужно ли блокировать кнопку. Введён из-за сложности одновременно
   * обрабатывать открытие/закрытие пикера и нажатие на кнопку открытия
   */
  private _disableButtonTimer: null | NodeJS.Timer = null;

  /**
   * Элемент, в котором находится пикер. Нужно для поиска пикера в нём
   */
  private _containerElement: ContainerT | null = null;

  /**
   * Элемент инпута стартовой даты.
   * (На самом деле, хранится другой элемент, но нажатие на него открывает пикер
   * с выбором стартовой даты)
   */
  private _startDateInputElement: null | HTMLElement = null;

  constructor(
    maxDaysToSelect: ConstructorParameters<typeof DaysRangePickerModel>[0] // maxDaysToSelect
  ) {
    super(maxDaysToSelect);

    makeObservable<this, PrivateFields>(this, {
      _firstRenderPassed: observable,
      _disableButtonTimer: observable,
      _containerElement: observable.ref,
      _startDateInputElement: observable.ref,

      firstRenderPassed: computed,
      disableButtonTimer: computed,

      setFirstRenderIsPassed: action,
      setContainerElement: action,
      _clearDisableButtonTimer: action,
      onOpenChange: override,
    });
  }

  get firstRenderPassed(): boolean {
    return this._firstRenderPassed;
  }

  get disableButtonTimer(): null | NodeJS.Timer {
    return this._disableButtonTimer;
  }

  /**
   * Должен быть вызван при монтировании компонента
   */
  setFirstRenderIsPassed = () => {
    this._firstRenderPassed = true;
  };

  setContainerElement = (value: ContainerT | null) => {
    this._containerElement = value;
  };

  private _clearDisableButtonTimer = () => {
    if (this._disableButtonTimer) {
      clearTimeout(this._disableButtonTimer);
    }
  };

  onOpenChange(open: boolean): void {
    if (open) {
      this._value = [null, null];
      return;
    }

    // Заблокировать кнопку открытия на время скрытия пикера
    this._disableButtonTimer = setTimeout(() => {
      runInAction(() => {
        this._disableButtonTimer = null;
      });
    }, DATE_PICKER_TRANSITION_MS);
  }

  /**
   * Вызывает программный клик по элементу инпута стартовой даты
   */
  clickStartDateInput = (): void => {
    if (this._startDateInputElement) {
      this._startDateInputElement.click();
    }
  };

  destroy = (): void => {
    this._firstRenderPassingReaction();
    this._clearDisableButtonTimer();
  };

  /**
   * Следит за флагом прохождения первого рендера. При первом рендере должно
   * проиходить присвоение элемента контейнера пикера (делается на стороне реакта),
   * при последующем - если ещё не присвоен и при этом есть элемент контейнера
   * в этом контейнере должен быть найден и присвоен элемент инпута стартовой даты
   */
  private _firstRenderPassingReaction: IReactionDisposer = reaction(
    () => ({
      firstRenderPassed: this._firstRenderPassed,
      containerElement: this._containerElement,
    }),
    ({ firstRenderPassed, containerElement }) => {
      if (
        !firstRenderPassed ||
        !containerElement ||
        this._startDateInputElement
      ) {
        return;
      }

      // Сохраняем элемент как HTMLElement, так как в HTMLElement
      // определён метод программного клика
      this._startDateInputElement = containerElement.getElementsByClassName(
        'ant-picker-range-separator'
      )[0] as HTMLElement;
    }
  );
}

export default HiddenRangePickerModel;
