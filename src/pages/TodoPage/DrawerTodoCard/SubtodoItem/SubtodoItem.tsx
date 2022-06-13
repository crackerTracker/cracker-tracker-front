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
import { filterSubTodos } from './utils/filterSubTodos';
import { filterTempSubTodos } from './utils/filterTempSubTodos';

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

  const { todos, tempSubTodos, editTodo, setTempSubTodos } = useTodoStore();

  const [todoData, setTodoData] = useState<TodoType>();

  useEffect(() => {
    const data = todos.find((todo) => todo._id === parentId);
    setTodoData(data);
  }, []);

  const deleteSubtodo = () => {
    // if deleting subtodos in todo
    if (todoData && parentId) {
      const { name, done, deadline, note, subTodos } = todoData;

      const subs = filterSubTodos(subTodos, _id);

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

    // if deleting subtodos in modal
    if (!parentId) {
      const subs = filterTempSubTodos(tempSubTodos, _id);
      setTempSubTodos(subs);
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
