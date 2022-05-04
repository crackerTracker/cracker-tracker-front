import { message } from 'antd';
import request from 'hooks/request';
import { makeAutoObservable, runInAction } from 'mobx';
import RootStore from './RootStore';

type PrivateFields = 'rootStore';

class AuthStore {
  private rootStore: RootStore;

  private _isAuthenticated = false;

  private _token: null | string = null;
  private _userId: null | string = null;
  readonly storageName = 'userData';

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  registerHandler = async (email: string, password: string) => {
    try {
      await request({
        url: '/api/auth/register',
        method: 'POST',
        headers: {},
        body: { email, password },
      });
      runInAction(() => {
        this.loginHandler(email, password);
      });
    } catch (e: any) {
      message.error(e.message);
    }
  };

  loginHandler = async (email: string, password: string) => {
    try {
      const data = await request({
        url: '/api/auth/login',
        method: 'POST',
        headers: {},
        body: { email, password },
      });
      runInAction(() => {
        this.login(data.token, data.userId);
      });
    } catch (e: any) {
      message.error(e.message);
    }
  };

  login = (jwtToken: string, id: string) => {
    this._token = jwtToken;
    this._userId = id;

    localStorage.setItem(
      this.storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );

    this._isAuthenticated = true;
  };

  logout = () => {
    this._token = null;
    this._userId = null;
    localStorage.removeItem(this.storageName);

    this._isAuthenticated = false;
  };

  get token() {
    return this._token;
  }

  get userId() {
    return this._userId;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }
}

export default AuthStore;
