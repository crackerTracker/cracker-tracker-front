import request from 'utils/request';
import { makeAutoObservable, runInAction } from 'mobx';
import RootStore from './RootStore';
import { endpoints } from 'config/endpoints';

export type PlannedPomoType = {
  _id: string;
  name: string;
  pomodorosAmount: number;
};

export type DonePomoType = {
  _id: string;
  name: string;
  minutesSpent: number;
  startTime: string;
  endTime: string;
};

type PrivateFields = 'rootStore';

class PomodoroStore {
  private rootStore: RootStore;

  public isLoading = false;
  public isTick = false;

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

  setIsTick(tick: boolean) {
    runInAction(() => {
      this.isTick = tick;
    });
  }

  get plannedPomosData() {
    return this._plannedPomosData;
  }

  get donePomosData() {
    return this._donePomosData;
  }

  requestAllPomos = async () => {
    this.isLoading = true;

    try {
      const data = await request({
        url: endpoints.requestAll.url,
        method: endpoints.requestAll.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      runInAction(() => {
        if (data) {
          this._plannedPomosData = data.plan;
          this._donePomosData = data.done;
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
      await request({
        url: endpoints.markDone.url,
        method: endpoints.markDone.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { plannedId, minutesSpent, startTime, endTime },
      });

      this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.markPomoDone:', e.message);
    }
  };

  // Planned

  createPlannedPomo = async (name: string, pomodorosAmount: number) => {
    try {
      await request({
        url: endpoints.createPlanned.url,
        method: endpoints.createPlanned.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { name, pomodorosAmount },
      });

      this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.createPlannedPomo:', e.message);
    }
  };

  deletePlannedPomo = async (toDeleteId: string) => {
    try {
      await request({
        url: endpoints.deletePlanned.url,
        method: endpoints.deletePlanned.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { toDeleteId },
      });

      this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.deletePlannedPomo:', e.message);
    }
  };

  deleteAllPlanned = async (toDeleteId: string) => {
    try {
      await request({
        url: endpoints.deleteAllPlanned.url,
        method: endpoints.deleteAllPlanned.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { toDeleteId },
      });

      this.requestAllPomos();
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
      await request({
        url: endpoints.editPlanned.url,
        method: endpoints.editPlanned.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { toEditId, name, pomodorosAmount },
      });

      this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.editPlannedPomo:', e.message);
    }
  };

  // Done

  deleteDonePomo = async (id: string) => {
    try {
      await request({
        url: endpoints.deleteDone.url,
        method: endpoints.deleteDone.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { toDeleteId: id },
      });

      this.requestAllPomos();
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
      await request({
        url: endpoints.editDone.url,
        method: endpoints.editDone.method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: { toEditId, name, minutesSpent, startTime, endTime },
      });

      this.requestAllPomos();
    } catch (e: any) {
      console.log('PomodoroStore.editDonePomo:', e.message);
    }
  };

  // Stats

  computeStatsTime = (pomosAmount: number, pomoTime = 50) => {
    const resultTime = pomosAmount * pomoTime;
    const hours = Math.trunc(resultTime / 60) || 0;
    const mins = resultTime - hours * 60 || 0;
    return `${hours}ч ${mins}м`;
  };

  get taskName() {
    return this.plannedPomosData.length ? this.plannedPomosData[0].name : '';
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
}

export default PomodoroStore;
