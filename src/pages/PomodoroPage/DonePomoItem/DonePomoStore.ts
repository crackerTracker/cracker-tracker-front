import { action, computed, makeObservable, observable } from 'mobx';
import moment from 'moment';
import PomodoroStore from 'stores/PomodoroStore/PomodoroStore';
import { format } from 'config/pomoconf';
import { DonePomoType } from 'stores/PomodoroStore/types';
import { PomoItemStore } from '../PomoItemStore';

type PrivateFields =
  | 'pomodoroStore'
  | '_spentMinutes'
  | 'endTime'
  | 'startTime'
  | 'temporaryMinutes';

export class DonePomoStore extends PomoItemStore {
  private _spentMinutes: number;
  private endTime: string;
  private startTime: string;
  private temporaryMinutes: number;

  constructor(
    pomodoroStore: PomodoroStore,
    { _id, name, endTime, startTime, minutesSpent }: DonePomoType
  ) {
    super(pomodoroStore, { _id, name });

    makeObservable<this, PrivateFields>(this, {
      pomodoroStore: false,
      _spentMinutes: observable,
      endTime: observable,
      startTime: observable,
      temporaryMinutes: observable,

      spentMinutes: computed,
      startTimeMoment: computed,
      endTimeMoment: computed,

      setSpentMinutes: action,
      setStartTime: action,
      setEndTime: action,
      approveEditing: action,
      deletePomoStack: action,
    });

    this._spentMinutes = minutesSpent;
    this.endTime = endTime;
    this.startTime = startTime;
    this.temporaryMinutes = minutesSpent;
  }

  get startTimeMoment() {
    const startTimeString = new Date(this.startTime)
      .toLocaleTimeString()
      .slice(0, -3);
    return moment(startTimeString, format);
  }

  get endTimeMoment() {
    const endTimeString = new Date(this.endTime)
      .toLocaleTimeString()
      .slice(0, -3);
    return moment(endTimeString, format);
  }

  get spentMinutes(): number {
    return this._spentMinutes;
  }

  setSpentMinutes = (minutes: number | string): void => {
    this._spentMinutes = Number(minutes);
  };

  setStartTime = (time: string): void => {
    this.startTime = time;
  };

  setEndTime = (time: string): void => {
    this.endTime = time;
  };

  deletePomoStack = async (): Promise<void> => {
    await this.pomodoroStore.deleteDonePomo(this.id);
    this.menuDeleteClick();
  };

  menuEditClick = (): void => {
    this.temporaryMinutes = this._spentMinutes;
    super.menuEditClick();
  };

  approveEditing = async (): Promise<void> => {
    const newSpentMs = Number(this._spentMinutes) * 60000;
    const newStartTime = new Date(
      new Date(this.endTime).getTime() - newSpentMs
    );
    const newStartTimeISOString = newStartTime.toISOString();
    const newEndTimeISOString = new Date(this.endTime).toISOString();

    await this.pomodoroStore.editDonePomo(
      this.id,
      this.pomoName,
      Number(this._spentMinutes),
      newStartTimeISOString,
      newEndTimeISOString
    );

    this.setStartTime(newStartTimeISOString);
    this.setEndTime(newEndTimeISOString);
    this.setIsEdit(false);
  };

  cancelChanges = (): void => {
    this.setSpentMinutes(this.temporaryMinutes);
    super.cancelChanges();
  };
}
