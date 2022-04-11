import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

class TestStore2 {
  private rootStore: RootStore;

  private _surname = 'SomeSurname';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setSurname = (value: string) => {
    this._surname = value;
  };

  get surname() {
    return this._surname;
  }
}

export default TestStore2;
