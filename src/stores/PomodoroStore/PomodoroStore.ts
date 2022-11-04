import request from 'utils/request';
import { getAuthHeader } from 'utils/getAuthHeader';
import { makeAutoObservable, runInAction } from 'mobx';
import RootStore from '../RootStore';
import { endpoints } from 'config/endpoints';
import { defaultPomoTime, TimerStatesEnum } from 'config/pomoconf';
import {
  ApiAllPomosType,
  DonePomoType,
  normalizePomoItems,
  PlannedPomoType,
} from './types';

type PrivateFields = 'rootStore';

class PomodoroStore {
  private rootStore: RootStore;

  public isLoading = false;
  public timerState = TimerStatesEnum.off;
  public pomoTime = defaultPomoTime;

  private _plannedPomosData: PlannedPomoType[] = [];
  private _donePomosData: DonePomoType[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get token() {
    return this.rootStore.authStore.token;
  }

  get plannedPomosData() {
    return this._plannedPomosData;
  }

  get donePomosData() {
    return this._donePomosData;
  }

  get planTime() {
    const resultTime = this.plannedPomosAmount * this.pomoTime;
    return this._printTime(resultTime);
  }

  get doneTime() {
    const resultTime = this._donePomosData
      .map((pomo) => pomo.minutesSpent)
      .reduce((time, mins) => mins + time, 0);
    return this._printTime(resultTime);
  }

  get taskName() {
    return this.plannedPomosData[0]?.name ?? '';
  }

  get plannedPomosAmount() {
    return this.plannedPomosData.length
      ? this.plannedPomosData
          .map((item) => item.pomodorosAmount)
          .reduce((sum, item) => sum + item)
      : 0;
  }

  get donePomosAmount() {
    return this._donePomosData.length;
  }

  setTimerState = (state: TimerStatesEnum) => {
    this.timerState = state;
  };

  requestAllPomos = async () => {
    this.isLoading = true;

    try {
      const data: ApiAllPomosType = await request({
        url: endpoints.requestAll.url,
        method: endpoints.requestAll.method,
        headers: getAuthHeader(this.token),
      });

      runInAction(() => {
        if (data) {
          this._plannedPomosData = normalizePomoItems<'planned'>(data.plan);
          this._donePomosData = normalizePomoItems<'done'>(data.done);
        }
      });
    } catch (e: any) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    this.isLoading = false;
  };

  markPomoDone = async (
    plannedId: string,
    minutesSpent: number,
    startTime: string,
    endTime: string
  ) => {
    try {
      const data = await request({
        url: endpoints.markDone.url,
        method: endpoints.markDone.method,
        headers: getAuthHeader(this.token),
        body: { plannedId, minutesSpent, startTime, endTime },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.markPomoDone:', e.message);
    }
  };

  // Planned

  createPlannedPomo = async (name: string, pomodorosAmount: number) => {
    try {
      const data = await request({
        url: endpoints.createPlanned.url,
        method: endpoints.createPlanned.method,
        headers: getAuthHeader(this.token),
        body: { name, pomodorosAmount },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.createPlannedPomo:', e.message);
    }
  };

  deletePlannedPomo = async (toDeleteId: string) => {
    try {
      const data = await request({
        url: endpoints.deletePlanned.url,
        method: endpoints.deletePlanned.method,
        headers: getAuthHeader(this.token),
        body: { toDeleteId },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.deletePlannedPomo:', e.message);
    }
  };

  deleteAllPlanned = async (toDeleteId: string) => {
    try {
      const data = await request({
        url: endpoints.deleteAllPlanned.url,
        method: endpoints.deleteAllPlanned.method,
        headers: getAuthHeader(this.token),
        body: { toDeleteId },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.deleteAllPlanned:', e.message);
    }
  };

  editPlannedPomo = async (
    toEditId: string,
    name?: string,
    pomodorosAmount?: number
  ) => {
    try {
      const data = await request({
        url: endpoints.editPlanned.url,
        method: endpoints.editPlanned.method,
        headers: getAuthHeader(this.token),
        body: { toEditId, name, pomodorosAmount },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.editPlannedPomo:', e.message);
    }
  };

  // Done

  deleteDonePomo = async (id: string) => {
    try {
      const data = await request({
        url: endpoints.deleteDone.url,
        method: endpoints.deleteDone.method,
        headers: getAuthHeader(this.token),
        body: { toDeleteId: id },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.deleteDonePomo:', e.message);
    }
  };

  editDonePomo = async (
    toEditId: string,
    name?: string,
    minutesSpent?: number,
    startTime?: string,
    endTime?: string
  ) => {
    try {
      const data = await request({
        url: endpoints.editDone.url,
        method: endpoints.editDone.method,
        headers: getAuthHeader(this.token),
        body: { toEditId, name, minutesSpent, startTime, endTime },
      });

      if (data) await this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.editDonePomo:', e.message);
    }
  };

  // Stats

  private _printTime = (resultTime: number) => {
    const hours = Math.trunc(resultTime / 60);
    const mins = resultTime - hours * 60;
    return `${hours}ч ${mins}м`;
  };
}

export default PomodoroStore;
