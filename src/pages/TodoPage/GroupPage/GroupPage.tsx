import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTodoStore } from 'stores/hooks';
import TodoList from '../TodoList';

const GroupPage: FC = () => {
  const param = useParams();

  const { requestTodos, todos, getGroups } = useTodoStore();

  const [groupTodos, setGroupTodos] = useState(todos);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ group }) => group?.name === param.name);
  }, [todos.length, param.name]);

  useEffect(() => {
    requestTodos();
    getGroups();
    setGroupTodos(filteredTodos);
  }, [param.name]);

  useEffect(() => {
    setGroupTodos(filteredTodos);
  }, [todos.length]);

  return <TodoList todos={groupTodos} />;
};

export default observer(GroupPage);
