import { message } from 'antd';
import { FormEvent, useState } from 'react';

type UsePomoItemProps = {
  name: string;
  defaultAmount: number;
};

export const usePomoItem = ({ name, defaultAmount }: UsePomoItemProps) => {
  const [pomoName, setPomoName] = useState(name);
  const [amount, setAmount] = useState<number | string>(defaultAmount);
  const [initial, setInitial] = useState({ pomoName, amount });
  const [isEdit, setIsEdit] = useState(false);

  const menuEditClick = () => {
    setIsEdit(true);
  };

  const menuDeleteClick = () => {
    message.success('Удалено');
  };

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setPomoName(e.currentTarget.value);
  };

  const cancelChanges = () => {
    setPomoName(initial.pomoName);
    setAmount(initial.amount);
    setIsEdit(false);
  };

  const approveChanges = () => {
    setInitial({ pomoName, amount });
    setIsEdit(false);
  };

  return {
    pomoName,
    amount,
    isEdit,
    setAmount,
    menuEditClick,
    menuDeleteClick,
    changeHandler,
    cancelChanges,
    approveChanges,
  };
};
