import { action, computed, makeObservable, observable } from 'mobx';

import { LoadingStage } from 'types/meta';

type PrivateFields = '_loadingStage';

class MetaModel {
  private _loadingStage: LoadingStage = LoadingStage.notStarted;

  constructor(initial = LoadingStage.notStarted) {
    this._loadingStage = initial;

    makeObservable<this, PrivateFields>(this, {
      _loadingStage: observable,

      loadingStage: computed,
      isLoading: computed,
      isLoadingNotStarted: computed,
      isError: computed,

      setNotLoading: action.bound,
      setLoading: action.bound,
      setError: action.bound,
    });
  }

  get loadingStage(): LoadingStage {
    return this._loadingStage;
  }

  get isLoading(): boolean {
    return this._loadingStage === LoadingStage.loading;
  }

  get isLoadingNotStarted(): boolean {
    return this._loadingStage === LoadingStage.notStarted;
  }

  get isError(): boolean {
    return this._loadingStage === LoadingStage.error;
  }

  setLoading(): void {
    this._loadingStage = LoadingStage.loading;
  }

  setError(): void {
    this._loadingStage = LoadingStage.error;
  }

  setNotLoading(): void {
    this._loadingStage = LoadingStage.notStarted;
  }
}

export default MetaModel;
