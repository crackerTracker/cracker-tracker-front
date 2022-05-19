import { Input, List } from 'antd';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useTodoStore } from 'stores/hooks';
import SubtodoItem from '../SubtodoItem';
import useTodo from '../useTodo';
import {
  InputGroup,
  StyledCard,
  StyledCheckbox,
  StyledInput,
} from './DrawerTodoCard.styles';

const DrawerTodoCard: FC<{
  _id?: string;
  name?: string;
  onCreateChangeHandler?: (e: FormEvent<HTMLInputElement>) => void;
}> = ({ _id, name, onCreateChangeHandler }) => {
  const { editTodo } = useTodoStore();
  const todoStore = useTodoStore();

  const {
    todoData,
    value,
    setValue,
    inputChangeHandler,
    isChecked,
    checkHandler,
  } = useTodo({
    _id,
  });

  useEffect(() => {
    if (name) setValue(name);
  }, [name]);

  const [subtodoAddInput, setSubtodoAddInput] = useState('');

  const onSubtodoAddInputChange = (e: FormEvent<HTMLInputElement>) => {
    setSubtodoAddInput(e.currentTarget.value);
  };

  const addSubtodo = () => {
    let toPush = [];

    // if editing todo
    if (_id && todoData) {
      const { name, done, deadline, note, subTodos } = todoData;

      if (subTodos) {
        const formSubTodos = subTodos.map((s) => ({
          name: s.name,
          done: s.done,
        }));

        toPush = [...formSubTodos, { name: subtodoAddInput, done: isChecked }];
      } else {
        toPush = [{ name: subtodoAddInput, done: isChecked }];
      }

      editTodo(
        _id,
        name,
        done,
        deadline,
        note,
        false,
        false,
        undefined,
        toPush
      );
    }

    // if creating todo using modal
    if (!_id && todoStore.tempSubTodos) {
      const length = todoStore.tempSubTodos.length;

      todoStore.tempSubTodos = [
        ...todoStore.tempSubTodos,
        {
          _id: String(length ? +todoStore.tempSubTodos[length - 1]._id + 1 : 1),
          name: subtodoAddInput,
          done: false,
        },
      ];
    }

    setSubtodoAddInput('');
  };

  const blurHandler = () => {
    if (_id) {
      editTodo(_id, value);
      setValue(value);
    }
  };

  return (
    <StyledCard
      bordered={false}
      title={
        <StyledCheckbox onChange={checkHandler} checked={isChecked}>
          <Input
            bordered={false}
            value={value}
            onChange={_id ? inputChangeHandler : onCreateChangeHandler}
            onBlur={blurHandler}
          />
        </StyledCheckbox>
      }
    >
      {/* if editing todo */}
      {_id && todoData?.subTodos && !!todoData?.subTodos.length && (
        <List
          dataSource={todoData.subTodos}
          renderItem={(item) => (
            <SubtodoItem key={item._id} parentId={_id} {...item} />
          )}
        />
      )}

      {/* if creating todo using modal */}
      {!_id && !!todoStore.tempSubTodos.length && (
        <List
          dataSource={todoStore.tempSubTodos}
          renderItem={(item) => <SubtodoItem key={item._id} {...item} />}
        />
      )}

      <InputGroup>
        <IconButton
          image={images.plusBrown.default}
          squareSide="35px"
          onClick={addSubtodo}
          paddings="0"
        />
        <StyledInput
          bordered={false}
          placeholder="Добавить подзадачу"
          value={subtodoAddInput}
          onChange={onSubtodoAddInputChange}
        />
      </InputGroup>
    </StyledCard>
  );
};

export default observer(DrawerTodoCard);
