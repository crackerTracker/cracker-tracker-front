import { request } from 'utils/request';
import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';
import MetaModel from './models/MetaModel';
import { endpoints } from 'config/endpoints';

type PrivateFields = 'rootStore';

class AuthStore {
  private rootStore: RootStore;

  private _isAuthenticated = false;

  protected readonly _meta: MetaModel = new MetaModel();

  private _token: null | string = null;
  private _userId: null | string = null;
  readonly storageName = 'userData';

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get meta(): MetaModel {
    return this._meta;
  }

  initUser = () => {
    const storageData = localStorage.getItem(this.storageName);
    const data = JSON.parse(String(storageData));

    if (data && data.token) {
      this.login(data.token, data.userId);
    }
  };

  registerHandler = async (email: string, password: string) => {
    this._meta.setLoading();

    try {
      const data = await request({
        ...endpoints.register,
        headers: {},
        body: { email, password },
      });

      if (data) {
        this.loginHandler(email, password);
      }
    } catch (e: any) {
      console.log('AuthStore.registerHandler', e);
      this._meta.setError();
    } finally {
      this._meta.setNotLoading();
    }
  };

  loginHandler = async (email: string, password: string) => {
    this._meta.setLoading();

    try {
      const data = await request({
        ...endpoints.login,
        headers: {},
        body: { email, password },
      });

      if (data) {
        this.login(data.token, data.userId);
      }
    } catch (e: any) {
      console.log('AuthStore.loginHandler', e);
      this._meta.setError();
    } finally {
      this._meta.setNotLoading();
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
