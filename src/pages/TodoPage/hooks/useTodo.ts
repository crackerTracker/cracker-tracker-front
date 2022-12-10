import { message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Moment } from 'moment';
import { FormEvent, useEffect, useState } from 'react';
import { useTodoStore } from 'stores/hooks';
import { TodoType } from 'stores/TodoStore/types';

type UseTodoProps = {
  _id?: string;
  name?: string;
  done?: boolean;
};

const useTodo = ({ _id, name, done }: UseTodoProps = {}) => {
  const {
    todos,
    createTodo,
    editTodo,
    deleteTodo,
    tempSubTodos,
    tempTodoName,
  } = useTodoStore();

  const [todoData, setTodoData] = useState<TodoType>();

  const [todoName, setTodoName] = useState(name || '');
  const [isChecked, setIsChecked] = useState(done || false);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    if (todos && _id) {
      const data = todos.find((todo) => todo._id === _id);
      setTodoData(data);

      if (data) {
        const { name, done, deadline, note } = data;

        setTodoName(name);
        setIsChecked(done);
        setDeadline(deadline);
        setNote(note);
      }
    }
  }, [todos, _id]);

  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTodoName(e.currentTarget.value);
  };

  const checkHandler = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    if (_id) editTodo(_id, todoName, e.target.checked);
  };

  const onDeadlineChange = (date: Moment | null) => {
    const edgeDate = new Date(String(date));
    edgeDate.setUTCHours(23, 59, 59, 999);

    setDeadline(edgeDate.toISOString());
    if (_id) editTodo(_id, todoName, isChecked, edgeDate.toISOString());
  };

  const deleteDeadline = () => {
    setDeadline(null);
  };

  const clearValue = () => {
    setTodoName('');
  };

  const addTodo = async () => {
    const subTodos = tempSubTodos.map((sub) => ({
      name: sub.name,
      done: sub.done,
    }));

    await createTodo(
      todoName || tempTodoName,
      isChecked,
      deadline,
      note,
      false,
      false,
      undefined,
      tempSubTodos.length ? subTodos : undefined
    );

    clearValue();
  };

  const onTextAreaChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setNote(e.currentTarget.value);
  };

  const deleteNote = () => {
    setNote(undefined);
  };

  const datePickerHandler = () => {
    setIsPickerOpen((v) => !v);
  };

  const deleteTodoHandler = async () => {
    if (_id) await deleteTodo(_id);
    message.success('Удалено');
  };

  return {
    todoData,
    todoName,
    setTodoName,
    inputChangeHandler,
    clearValue,
    addTodo,
    deleteTodoHandler,
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
