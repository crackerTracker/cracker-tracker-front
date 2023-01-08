import { makeAutoObservable } from 'mobx';
import { DayType, TaskType } from 'stores/TrackerStore/types';
import moment from 'moment';
import { SHORTEST_WEEKDAY_FORMAT } from 'config/datesTimeFormats';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';

// контролирует внутреннее состояние DateCard
class DateCardStore {
  private _day: DayType;

  constructor(day: DayType) {
    makeAutoObservable(this);

    this._day = day;
  }

  private get _fullDate(): string {
    const date = new Date(this._day.timestamp);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  private get _weekDay(): string {
    return moment(this._day.timestamp).format(SHORTEST_WEEKDAY_FORMAT);
  }

  get tasks(): TaskType[] {
    return this._day.tasks;
  }

  get dayTitle(): string {
    return `${this._fullDate}, ${this._weekDay}`;
  }

  get totalTimeString(): string {
    const totalMinutes = this._day.tasks.reduce(
      (sum, task) => sum + task.minutesSpent,
      0
    );

    return getMinsAndHoursStringFromMins(totalMinutes);
  }
}

export default DateCardStore;
