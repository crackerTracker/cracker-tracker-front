import { Input, List } from 'antd';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useTodoStore } from 'stores/hooks';
import SubtodoItem from './SubtodoItem';
import useTodo from '../useTodo';
import {
  InputGroup,
  StyledCard,
  StyledCheckbox,
  StyledInput,
} from './DrawerTodoCard.styles';

type DrawerTodoCardProps = {
  _id?: string;
  name?: string;
  onCreateChangeHandler?: (e: FormEvent<HTMLInputElement>) => void;
};

const DrawerTodoCard: FC<DrawerTodoCardProps> = ({
  _id,
  name,
  onCreateChangeHandler,
}) => {
  const { tempSubTodos, editTodo, setTempSubTodos } = useTodoStore();

  const {
    todoData,
    todoName,
    setTodoName,
    inputChangeHandler,
    isChecked,
    checkHandler,
  } = useTodo({
    _id,
  });

  useEffect(() => {
    if (name) setTodoName(name);
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

        toPush = [...formSubTodos, { name: subtodoAddInput, done: false }];
      } else {
        toPush = [{ name: subtodoAddInput, done: false }];
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
    if (!_id && tempSubTodos) {
      const length = tempSubTodos.length;

      setTempSubTodos([
        ...tempSubTodos,
        {
          _id: String(length ? +tempSubTodos[length - 1]._id + 1 : 1),
          name: subtodoAddInput,
          done: false,
        },
      ]);
    }

    setSubtodoAddInput('');
  };

  const blurHandler = () => {
    if (_id) {
      editTodo(_id, todoName);
      setTodoName(todoName);
    }
  };

  return (
    <StyledCard
      bordered={false}
      title={
        <StyledCheckbox onChange={checkHandler} checked={isChecked}>
          <Input
            bordered={false}
            value={todoName}
            onChange={_id ? inputChangeHandler : onCreateChangeHandler}
            onBlur={blurHandler}
          />
        </StyledCheckbox>
      }
    >
      {/* if editing todo */}
      {_id && !!todoData?.subTodos?.length && (
        <List
          dataSource={todoData.subTodos}
          renderItem={(item) => (
            <SubtodoItem key={item._id} parentId={_id} {...item} />
          )}
        />
      )}

      {/* if creating todo using modal */}
      {!_id && !!tempSubTodos.length && (
        <List
          dataSource={tempSubTodos}
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
