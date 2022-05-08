import { message } from 'antd';
import { FormEvent, useState } from 'react';

type UseInputProps = {
  task: string;
  amount: number;
};

export const useInput = ({ task, amount }: UseInputProps) => {
  const [value, setValue] = useState(task);
  const [amounts, setAmount] = useState<number | string>(amount);
  const [initial, setInitial] = useState({ value, amounts });
  const [isEdit, setIsEdit] = useState(false);

  const menuEditClick = () => {
    setIsEdit(true);
  };

  const menuDeleteClick = () => {
    message.success('Удалено');
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
