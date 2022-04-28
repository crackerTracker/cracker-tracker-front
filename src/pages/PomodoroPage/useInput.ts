import { MenuProps, message } from 'antd';
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

  const menuEditClick: MenuProps['onClick'] = () => {
    setIsEdit(true);
  };

  const menuDeleteClick: MenuProps['onClick'] = (e) => {
    message.info('Deleted');
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
