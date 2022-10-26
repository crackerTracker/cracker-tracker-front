import { message } from 'antd';
import { action, computed, makeObservable, observable } from 'mobx';
import { FormEvent } from 'react';
import PomodoroStore from 'stores/PomodoroStore/PomodoroStore';
import { PomoItemType } from 'stores/PomodoroStore/types';

type PrivateFields =
  | 'pomodoroStore'
  | '_pomoName'
  | '_isEdit'
  | 'temporaryName';

export abstract class PomoItemStore {
  protected pomodoroStore: PomodoroStore;

  protected readonly id;
  protected _pomoName: string;
  protected _isEdit = false;
  protected temporaryName: string;

  constructor(pomodoroStore: PomodoroStore, { _id, name }: PomoItemType) {
    makeObservable<this, PrivateFields>(this, {
      _isEdit: observable,
      _pomoName: observable,
      temporaryName: observable,
      pomodoroStore: false,

      pomoName: computed,
      isEdit: computed,

      setIsEdit: action,
      changeHandler: action,
      menuEditClick: action,
      menuDeleteClick: action,
      cancelChanges: action,
    });

    this.pomodoroStore = pomodoroStore;
    this.id = _id;
    this._pomoName = name;
    this.temporaryName = name;
  }

  get pomoName(): string {
    return this._pomoName;
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  setIsEdit = (isEdit: boolean): void => {
    this._isEdit = isEdit;
  };

  changeHandler = (e: FormEvent<HTMLInputElement>): void => {
    this._pomoName = e.currentTarget.value;
  };

  menuEditClick(): void {
    this.temporaryName = this._pomoName;
    this.setIsEdit(true);
  }

  menuDeleteClick = (): void => {
    message.success('Удалено');
  };

  cancelChanges(): void {
    this._pomoName = this.temporaryName;
    this._isEdit = false;
  }

  approveEditing = async (): Promise<void> => {};

  deletePomoStack = async (): Promise<void> => {};
}
