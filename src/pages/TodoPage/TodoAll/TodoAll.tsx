import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useTodoStore } from 'stores/hooks';
import { TodoType } from 'stores/TodoStore/types';
import TodoItem from '../TodoItem';
import { StyledList, Todos } from './TodoAll.styles';

const TodoAll: FC = () => {
  const { currentTodosToggle, toggleTodoItems, setToggleTodoItems } =
    useTodoStore();

  useEffect(() => {
    setToggleTodoItems();
  }, [currentTodosToggle]);

  return (
    <Todos>
      <StyledList
        size="large"
        bordered
        dataSource={toggleTodoItems}
        renderItem={(item) => (
          <TodoItem key={(item as TodoType)._id} _id={(item as TodoType)._id} />
        )}
      />
    </Todos>
  );
};

export default observer(TodoAll);
