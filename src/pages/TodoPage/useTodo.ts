import { message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Moment } from 'moment';
import { FormEvent, useState } from 'react';
import TodoMockStore from './todoMockData';

type UseTodoProps = {
  id?: number;
  name?: string;
  done?: boolean;
};

const useTodo = ({ id, name, done }: UseTodoProps) => {
  const { todos } = new TodoMockStore();
  const todoData = todos.find((todo) => todo.id === id);

  const [value, setValue] = useState(todoData?.name || name);
  const [isChecked, setIsChecked] = useState(todoData?.done || done);
  const [deadline, setDeadline] = useState(todoData?.deadline || '');
  const [note, setNote] = useState(todoData?.note || '');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const checkHandler = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onDeadlineChange = (date: Moment | null) => {
    setDeadline(new Date(String(date)).toLocaleDateString());
  };

  const deleteDeadline = () => {
    setDeadline('');
  };

  const addTodo = () => {
    setValue('');
  };

  const onTextAreaChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setNote(e.currentTarget.value);
  };

  const deleteNote = () => {
    setNote('');
  };

  const datePickerHandler = () => {
    setIsPickerOpen((v) => !v);
  };

  const deleteTodo = () => {
    message.success('Удалено');
  };

  return {
    todoData,
    value,
    inputChangeHandler,
    addTodo,
    deleteTodo,
    isChecked,
    checkHandler,
    deadline,
    deleteDeadline,
    onDeadlineChange,
    note,
    onTextAreaChange,
    deleteNote,
    isPickerOpen,
    datePickerHandler,
  };
};

export default useTodo;
