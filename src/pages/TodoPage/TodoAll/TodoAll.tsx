import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useTodoStore } from 'stores/hooks';
import { TodoType } from 'stores/TodoStore/TodoStore';
import TodoItem from '../TodoItem';
import { StyledList, Todos } from './TodoAll.styles';

const TodoAll: FC = () => {
  const { todos, requestTodos: getTodos, todosToggle } = useTodoStore();

  useEffect(() => {
    getTodos();
  }, []);

  const toggleTodoItems = () => {
    switch (todosToggle) {
      case 0:
        return todos;
      case 1:
        return todos.filter((t) => t.deadline);
      case 2:
        return todos.filter((t) => !t.deadline);
    }
  };

  return (
    <Todos>
      <StyledList
        size="large"
        bordered
        dataSource={toggleTodoItems()}
        renderItem={(item) => (
          <TodoItem key={(item as TodoType)._id} _id={(item as TodoType)._id} />
        )}
      />
    </Todos>
  );
};

export default observer(TodoAll);
