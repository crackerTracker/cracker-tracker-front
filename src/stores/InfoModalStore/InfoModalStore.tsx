import React from 'react';
import { makeAutoObservable } from 'mobx';
import { InfoModalTypesEnum } from './types';

// todo доделать модалку
class InfoModalStore {
  isModalVisible = false;
  onClose = () => {};
  infoType = InfoModalTypesEnum.question;
  message: React.ReactNode = (<></>);
  onClickOk = () => {};
  onClickCancel = () => {};

  constructor() {
    makeAutoObservable(this);
  }

  setIsModalVisible = (value: boolean) => {
    this.isModalVisible = value;
  };

  setOnClose = (callback: VoidFunction) => {
    this.onClose = callback;
  };

  setInfoType = (value: InfoModalTypesEnum) => {
    this.infoType = value;
  };

  setMessage = (node: React.ReactNode) => {
    this.message = node;
  };

  setOnClickOk = (callback: VoidFunction) => {
    this.onClickOk = callback;
  };

  setOnClickCancel = (callback: VoidFunction) => {
    this.onClickCancel = callback;
  };
}

export default InfoModalStore;
