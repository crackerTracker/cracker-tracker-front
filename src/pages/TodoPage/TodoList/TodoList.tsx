import React, { FC, memo } from 'react';
import { TodoType } from 'stores/TodoStore/types';
import TodoItem from './TodoItem';
import { Todos, StyledList } from './TodoList.styles';

type Props = {
  todos: TodoType[];
};

const TodoList: FC<Props> = ({ todos }) => {
  return (
    <Todos>
      <StyledList
        size="large"
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <TodoItem key={(item as TodoType)._id} _id={(item as TodoType)._id} />
        )}
      />
    </Todos>
  );
};

export default memo(TodoList);
