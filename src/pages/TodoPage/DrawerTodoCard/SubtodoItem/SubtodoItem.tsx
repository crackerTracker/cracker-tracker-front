import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useTodoStore } from 'stores/hooks';
import { TodoType } from 'stores/TodoStore/types';
import useTodo from '../../useTodo';
import {
  SubtodoListItem,
  StyledCheckbox,
  StyledInput,
} from './SubtodoItem.styles';

type SubtodoItemProps = {
  parentId?: string;
  _id: string;
  name: string;
  done: boolean;
};

const SubtodoItem: FC<SubtodoItemProps> = ({ parentId, _id, name, done }) => {
  const { todoName, inputChangeHandler, isChecked, checkHandler } = useTodo({
    name,
    done,
  });

  const { todos, editTodo } = useTodoStore();
  const todoStore = useTodoStore();

  const [todoData, setTodoData] = useState<TodoType>();

  useEffect(() => {
    const data = todos.find((todo) => todo._id === parentId);
    setTodoData(data);
  }, []);

  const deleteSubtodo = () => {
    // if deleting subtodos in todo
    if (todoData && parentId) {
      const { name, done, deadline, note, subTodos } = todoData;

      const subs = subTodos
        .filter((sub) => sub._id !== _id)
        .map((sub) => ({ name: sub.name, done: sub.done }));

      editTodo(
        parentId,
        name,
        done,
        deadline,
        note,
        false,
        false,
        undefined,
        subs
      );
    }

    // if creating todo using modal
    if (!parentId) {
      const subs = todoStore.tempSubTodos
        .filter((sub) => sub._id !== _id)
        .map((sub) => ({ _id: sub._id, name: sub.name, done: sub.done }));

      todoStore.setTempSubTodos(subs);
    }
  };

  const checkSubtodoHandler = (e: CheckboxChangeEvent) => {
    checkHandler(e);

    // if editing subtodos in todo
    if (todoData && parentId) {
      const { name, done, deadline, note } = todoData;

      const subs = todoData.subTodos.map((sub) =>
        sub._id === _id
          ? { name: sub.name, done: e.target.checked }
          : { name: sub.name, done: sub.done }
      );

      editTodo(
        parentId,
        name,
        done,
        deadline,
        note,
        false,
        false,
        undefined,
        subs
      );
    }
  };

  const onBlurHandler = async () => {
    // if editing subtodos in todo
    if (todoData && parentId) {
      const { name, done, deadline, note, subTodos } = todoData;

      const dbSubTodoName = subTodos.find((sub) => sub._id === _id)?.name;

      if (todoName !== dbSubTodoName) {
        const subs = subTodos.map((sub) =>
          sub._id === _id
            ? { name: todoName, done: sub.done }
            : { name: sub.name, done: sub.done }
        );

        await editTodo(
          parentId,
          name,
          done,
          deadline,
          note,
          false,
          false,
          undefined,
          subs
        );
      }
    }
  };

  return (
    <SubtodoListItem>
      <StyledCheckbox onChange={checkSubtodoHandler} checked={isChecked}>
        <StyledInput
          bordered={false}
          value={todoName}
          onChange={inputChangeHandler}
          onBlur={onBlurHandler}
        />
      </StyledCheckbox>
      <IconButton
        image={images.closeBrown.default}
        squareSide="15px"
        onClick={deleteSubtodo}
        paddings="0"
      />
    </SubtodoListItem>
  );
};

export default observer(SubtodoItem);
