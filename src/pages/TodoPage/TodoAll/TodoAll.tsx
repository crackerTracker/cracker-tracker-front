import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTodoStore } from 'stores/hooks';
import TodoList from '../TodoList';

const TodoAll: FC = () => {
  const {
    currentTodosToggle,
    toggleTodoItems,
    requestTodos,
    getGroups,
    groups,
  } = useTodoStore();

  useEffect(() => {
    requestTodos();
  }, [currentTodosToggle]);

  useEffect(() => {
    getGroups();
  }, [groups.length]);

  return <TodoList todos={toggleTodoItems} />;
};

export default observer(TodoAll);
