import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import TodoItem from '../TodoItem';
import TodoMockStore, { TodoType } from '../todoMockData';
import { StyledList, Todos } from './TodoAll.styles';

const TodoAll: FC = () => {
  const { todos } = new TodoMockStore();

  return (
    <Todos>
      <StyledList
        size="large"
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <TodoItem key={(item as TodoType).id} id={(item as TodoType).id} />
        )}
      />
    </Todos>
  );
};

export default observer(TodoAll);
