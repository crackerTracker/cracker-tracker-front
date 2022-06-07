import { TodosToggleEnum } from 'config/todo';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useTodoStore } from 'stores/hooks';
import { TodoType } from 'stores/TodoStore/types';
import TodoItem from '../TodoItem';
import { StyledList, Todos } from './TodoAll.styles';

const TodoAll: FC = () => {
  const { todos, requestTodos, currentTodosToggle } = useTodoStore();
  const todoStore = useTodoStore();

  useEffect(() => {
    // requestTodos();
    todoStore.setToggleTodoItems(TodosToggleEnum.all); //? без todoStore теряет контекст
  }, []);

  //todo computed value in store
  const toggleTodoItems = () => {
    switch (currentTodosToggle) {
      case TodosToggleEnum.all:
        return todos;
      case TodosToggleEnum.withDate:
        return todos.filter((t) => t.deadline);
      case TodosToggleEnum.withoutDate:
        return todos.filter((t) => !t.deadline);
    }
  };

  //todo toggleTodoItems() --> todoStore.toggleTodoItems
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
