import { message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import IconButton from 'components/IconButton/IconButton';
import { images } from 'img/icons';
import React, { FC, FormEvent, memo, useState } from 'react';
import { SubtodoType } from '../todoMockData';
import {
  SubtodoListItem,
  StyledCheckbox,
  StyledInput,
} from './SubtodoItem.styles';

const SubtodoItem: FC<SubtodoType> = ({ name, done }) => {
  const [isChecked, setIsChecked] = useState(done);
  const [value, setValue] = useState(name);

  const subtodoChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const checkHandler = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const deleteSubtodoHandler = () => {
    message.success('deleted');
  };

  return (
    <SubtodoListItem>
      <StyledCheckbox onChange={checkHandler} $isChecked={isChecked}>
        <StyledInput
          bordered={false}
          value={value}
          onChange={subtodoChangeHandler}
        />
      </StyledCheckbox>
      <IconButton
        image={images.closeBrown.default}
        squareSide="35px"
        onClick={deleteSubtodoHandler}
      />
    </SubtodoListItem>
  );
};

export default memo(SubtodoItem);
