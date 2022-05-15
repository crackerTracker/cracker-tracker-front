import { Input, List } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import IconButton from 'components/IconButton/IconButton';
import { images } from 'img/icons';
import React, { FC, FormEvent, memo, useState } from 'react';
import SubtodoItem from '../SubtodoItem';
import todos from '../todoMockData';
import {
  InputGroup,
  StyledCard,
  StyledCheckbox,
  StyledInput,
} from './DrawerTodoCard.styles';

const DrawerTodoCard: FC<{ id: number }> = ({ id }) => {
  const todoData = todos.find((todo) => todo.id === id);

  const [isChecked, setIsChecked] = useState(todoData?.done);
  const [value, setValue] = useState(todoData?.name);
  const [addTaskValue, setAddTaskValue] = useState('');

  const checkHandler = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const todoChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const addTaskChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setAddTaskValue(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    setAddTaskValue('');
  };

  return (
    <StyledCard
      bordered={false}
      title={
        <StyledCheckbox onChange={checkHandler} $isChecked={isChecked || false}>
          <Input bordered={false} value={value} onChange={todoChangeHandler} />
        </StyledCheckbox>
      }
    >
      {todoData?.subtodos?.length !== 0 && (
        <List
          dataSource={todoData?.subtodos}
          renderItem={(item) => <SubtodoItem key={item.id} {...item} />}
        />
      )}

      <InputGroup>
        <IconButton
          image={images.plusBrown.default}
          squareSide="45px"
          onClick={addTaskHandler}
        />
        <StyledInput
          bordered={false}
          placeholder="Добавить задачу"
          value={addTaskValue}
          onChange={addTaskChangeHandler}
        />
      </InputGroup>
    </StyledCard>
  );
};

export default memo(DrawerTodoCard);
