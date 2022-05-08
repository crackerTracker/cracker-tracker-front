import request from 'hooks/request';
import { makeAutoObservable, runInAction } from 'mobx';
import RootStore from './RootStore';

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

  private _token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjZjNjFhYzhhOTI4MTNjMTBmOTYyZWQiLCJpYXQiOjE2NTEyNzAzMjR9.ucKvwTZpeKNmNW8ssZLxGKk_fvL7mU5bbfnGym1eWOE';

  public isLoading = false;
  private _isTick = false;
  private _request = request;

  private _plannedPomosData: PlannedPomoType[] = [];
  private _donePomosData: DonePomoType[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    runInAction(() => {
      this._token = token;
    });
  }

  get isTick() {
    return this._isTick;
  }

  set isTick(tick: boolean) {
    runInAction(() => {
      this._isTick = tick;
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
      const data = await this._request?.({
        url: '/api/pomodoro/pomodoros',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      });

      runInAction(() => {
        if (data) {
          this._plannedPomosData = data?.plan;
          this._donePomosData = data?.done;
        }

        this.isLoading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  markPomoDone = async (
    plannedId: string,
    minutesSpent: number,
    startTime: string,
    endTime: string
  ) => {
    try {
      await this._request({
        url: '/api/pomodoro/markDone',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { plannedId, minutesSpent, startTime, endTime },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  // Planned

  createPlannedPomo = async (name: string, pomodorosAmount: number) => {
    try {
      await this._request({
        url: '/api/pomodoro/createPlanned',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { name, pomodorosAmount },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  deletePlannedPomo = async (toDeleteId: string) => {
    try {
      await this._request({
        url: '/api/pomodoro/deletePlanned',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { toDeleteId },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  deleteAllPlanned = async (toDeleteId: string) => {
    try {
      await this._request({
        url: '/api/pomodoro/deleteAllPlanned',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { toDeleteId },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  editPlannedPomo = async (
    toEditId: string,
    name?: string,
    pomodorosAmount?: number
  ) => {
    try {
      await this._request({
        url: '/api/pomodoro/editPlanned',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { toEditId, name, pomodorosAmount },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Done

  deleteDonePomo = async (id: string) => {
    try {
      await this._request({
        url: '/api/pomodoro/deleteDone',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { toDeleteId: id },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
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
      await this._request({
        url: '/api/pomodoro/editDone',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
        body: { toEditId, name, minutesSpent, startTime, endTime },
      });

      runInAction(() => {
        this.requestAllPomos();
      });
    } catch (e: any) {
      console.log(e);
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
    return this.plannedPomosData?.length ? this.plannedPomosData[0].name : '';
  }

  get plannedPomosAmount() {
    return this.plannedPomosData?.length
      ? this.plannedPomosData
          .map((item) => item.pomodorosAmount)
          .reduce((item, sum) => item + sum)
      : 0;
  }

  get donePomosAmount() {
    return this._donePomosData?.length;
  }
}

export default PomodoroStore;
