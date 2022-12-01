import { message } from 'antd';
import { GROUP_NAME_MAX_LENGTH } from 'config/todo';
import { InputStatusesEnum } from 'types/antd';

type GroupInputStatuses = '' | InputStatusesEnum.error;

export const getGroupNameInputStatus = (value: string) => {
  const status: GroupInputStatuses =
    value.includes('/') || value.length > GROUP_NAME_MAX_LENGTH
      ? InputStatusesEnum.error
      : '';

  return status;
};

export const handleGroupNameInputError = (value: string) => {
  if (getGroupNameInputStatus(value) === InputStatusesEnum.error) {
    if (value.includes('/')) {
      message.error("Нельзя использовать знак '/'");
      return;
    }

    if (value.length > GROUP_NAME_MAX_LENGTH) {
      message.error(`Введите менее ${GROUP_NAME_MAX_LENGTH} символов`);
      return;
    }
  }
};

export const isGroupNameInputStatusNotOk = (value: string) =>
  getGroupNameInputStatus(value) in InputStatusesEnum;
