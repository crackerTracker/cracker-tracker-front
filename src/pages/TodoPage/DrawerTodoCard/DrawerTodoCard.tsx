import { Input, List } from 'antd';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import React, { FC, FormEvent, useState } from 'react';
import SubtodoItem from '../SubtodoItem';
import useTodo from '../useTodo';
import {
  InputGroup,
  StyledCard,
  StyledCheckbox,
  StyledInput,
} from './DrawerTodoCard.styles';

const DrawerTodoCard: FC<{ id?: number; name?: string }> = ({ id, name }) => {
  const { todoData, value, inputChangeHandler, isChecked, checkHandler } =
    useTodo({ id });

  const [subtodoAddInput, setSubtodoAddInput] = useState('');

  const onSubtodoAddInputChange = (e: FormEvent<HTMLInputElement>) => {
    setSubtodoAddInput(e.currentTarget.value);
  };

  const addSubtodo = () => {
    setSubtodoAddInput('');
  };

  return (
    <StyledCard
      bordered={false}
      title={
        <StyledCheckbox onChange={checkHandler} checked={isChecked || false}>
          <Input
            bordered={false}
            value={value || name}
            onChange={inputChangeHandler}
          />
        </StyledCheckbox>
      }
    >
      {id && todoData?.subtodos?.length !== 0 && (
        <List
          dataSource={todoData?.subtodos}
          renderItem={(item) => <SubtodoItem key={item.id} {...item} />}
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
          placeholder="Добавить задачу"
          value={subtodoAddInput}
          onChange={onSubtodoAddInputChange}
        />
      </InputGroup>
    </StyledCard>
  );
};

export default observer(DrawerTodoCard);
