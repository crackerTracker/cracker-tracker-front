import IconButton from 'components/IconButton/IconButton';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { SubtodoType } from '../todoMockData';
import useTodo from '../useTodo';
import {
  SubtodoListItem,
  StyledCheckbox,
  StyledInput,
} from './SubtodoItem.styles';

const SubtodoItem: FC<SubtodoType> = ({ name, done }) => {
  const {
    value,
    inputChangeHandler,
    isChecked,
    checkHandler,
    deleteTodo: deleteSubtodo,
  } = useTodo({ name, done });

  return (
    <SubtodoListItem>
      <StyledCheckbox onChange={checkHandler} checked={isChecked || false}>
        <StyledInput
          bordered={false}
          value={value}
          onChange={inputChangeHandler}
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
