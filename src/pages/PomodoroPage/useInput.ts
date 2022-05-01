import { message } from 'antd';
import { FormEvent, useState } from 'react';

type UseInputProps = {
  task: string;
  amount: number;
};

export const useInput = ({ task, amount }: UseInputProps) => {
  const [value, setValue] = useState<string>(task);
  const [amounts, setAmount] = useState<number | string>(amount);
  const [initial, setInitial] = useState({ value, amounts });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const menuEditClick = () => {
    setIsEdit(true);
  };

  const menuDeleteClick = () => {
    message.info('Удалено');
    setValue('');
    setAmount(0);
    setInitial({ value: '', amounts: 0 });
  };

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const cancelChanges = () => {
    setValue(initial.value);
    setAmount(initial.amounts);
    setIsEdit(false);
  };

  const approveChanges = () => {
    setInitial({ value, amounts });
    setIsEdit(false);
  };

  return {
    value,
    amounts,
    isEdit,
    setAmount,
    menuEditClick,
    menuDeleteClick,
    changeHandler,
    cancelChanges,
    approveChanges,
  };
};
