import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTodoStore } from 'stores/hooks';
import TodoList from '../TodoList';

const GroupPage: FC = () => {
  const param = useParams();

  const { requestTodos, toggleTodoItems, getGroups } = useTodoStore();

  const [groupTodos, setGroupTodos] = useState(toggleTodoItems);

  useEffect(() => {
    requestTodos();
    getGroups();
    setGroupTodos(
      toggleTodoItems.filter(({ group }) => group?.name === param.name)
    );
  }, [param.name]);

  return <TodoList todos={groupTodos} />;
};

export default observer(GroupPage);
