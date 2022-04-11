import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

class TestStore {
  private rootStore: RootStore;

  private _name = 'Dima1';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setName = (value: string) => {
    this._name = value;
  };

  get name() {
    return this._name;
  }

  get fullName() {
    return `${this._name} ${this.rootStore.testStore2.surname}`;
  }
}

export default TestStore;
