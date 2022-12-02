import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTodoStore } from 'stores/hooks';
import TodoList from '../TodoList';

const GroupPage: FC = () => {
  const param = useParams();

  const { requestTodos, todos, getGroups } = useTodoStore();

  const filteredTodos = useMemo(() => {
    return todos.filter(({ group }) => group?.name === param.name);
  }, [todos.length, param.name]);

  const init = useCallback(async () => {
    await requestTodos();
    await getGroups();
  }, []);

  useEffect(() => {
    init();
  }, []);

  return <TodoList todos={filteredTodos} />;
};

export default observer(GroupPage);
