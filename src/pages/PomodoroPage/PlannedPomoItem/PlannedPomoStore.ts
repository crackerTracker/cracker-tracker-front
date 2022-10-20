import { action, computed, makeObservable, observable } from 'mobx';
import PomodoroStore from 'stores/PomodoroStore/PomodoroStore';
import { defaultInitialMinutes, TimerStatesEnum } from 'config/pomoconf';
import { PlannedPomoType } from 'stores/PomodoroStore/types';
import { PomoItemStore } from '../PomoItemStore';

type PrivateFields = 'pomodoroStore' | '_pomoAmount' | 'temporaryAmount';

export class PlannedPomoStore extends PomoItemStore {
  private _pomoAmount: number;
  private temporaryAmount: number;

  constructor(
    pomodoroStore: PomodoroStore,
    { id, name, pomodorosAmount }: PlannedPomoType
  ) {
    super(pomodoroStore, { id, name });

    makeObservable<this, PrivateFields>(this, {
      _pomoAmount: observable,
      temporaryAmount: observable,
      pomodoroStore: false,

      isSetDisabled: computed,
      pomoAmount: computed,

      setPomoAmount: action,
      approveEditing: action,
      menuAddPomo: action,
      calculateTime: action,
      menuMarkDone: action,
      menuDeletePomo: action,
      deletePomoStack: action,
    });

    this._pomoAmount = pomodorosAmount;
    this.temporaryAmount = pomodorosAmount;
  }

  get isSetDisabled(): boolean {
    const firstPomo = this.pomodoroStore.plannedPomosData[0];
    const timerState = this.pomodoroStore.timerState;
    return firstPomo.id === this.id && timerState === TimerStatesEnum.work;
  }

  get pomoAmount(): number {
    return this._pomoAmount;
  }

  setPomoAmount = (amount: number | string): void => {
    this._pomoAmount = Number(amount);
  };

  menuAddPomo = async (): Promise<void> => {
    this.setPomoAmount(Number(this._pomoAmount) + 1);

    await this.pomodoroStore.editPlannedPomo(
      this.id,
      this.pomoName,
      this._pomoAmount
    );
  };

  calculateTime = (): { [key: string]: string } => {
    const spentMs = defaultInitialMinutes * 60000;
    const endTime = new Date();
    const endTimeISOString = endTime.toISOString();

    const startTime = new Date(endTime.getTime() - spentMs);
    const startTimeISOString = startTime.toISOString();

    return { endTimeISOString, startTimeISOString };
  };

  menuMarkDone = async (): Promise<void> => {
    const { endTimeISOString, startTimeISOString } = this.calculateTime();

    this.setPomoAmount(Number(this._pomoAmount) - 1);

    await this.pomodoroStore.markPomoDone(
      this.id,
      defaultInitialMinutes,
      startTimeISOString,
      endTimeISOString
    );
  };

  menuDeletePomo = async (): Promise<void> => {
    this.setPomoAmount(Number(this._pomoAmount) - 1);
    await this.pomodoroStore.deletePlannedPomo(this.id);
  };

  deletePomoStack = async (): Promise<void> => {
    await this.pomodoroStore.deleteAllPlanned(this.id);
    this.menuDeleteClick();
  };

  menuEditClick = (): void => {
    this.temporaryAmount = this._pomoAmount;
    super.menuEditClick();
  };

  approveEditing = async (): Promise<void> => {
    await this.pomodoroStore.editPlannedPomo(
      this.id,
      this.pomoName,
      Number(this._pomoAmount)
    );

    this.setIsEdit(false);
  };

  cancelChanges = (): void => {
    this.setPomoAmount(this.temporaryAmount);
    super.cancelChanges();
  };
}
