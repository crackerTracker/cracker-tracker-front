import { Col, message, Row } from 'antd';
import React, { FC, FormEvent, memo, useState } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
} from './TaskInput.style';

const TaskInput: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState<string | number>('');

  const { createPlannedPomo, plannedPomosData, editPlannedPomo } =
    usePomodoroStore();
  const lastPomo = plannedPomosData[plannedPomosData.length - 1];

  const clickHandler = () => {
    if (value && amount && +amount - Math.trunc(+amount) === 0) {
      if (lastPomo && value.trim() === lastPomo.name) {
        editPlannedPomo(
          lastPomo.id,
          lastPomo.name,
          Number(amount) + lastPomo.pomodorosAmount
        );
      } else {
        createPlannedPomo(value.trim(), Number(amount));
      }

      setValue('');
      setAmount('');
      setIsEdit(false);
    } else {
      message.warning('Заполните все поля');
    }
  };

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const focusHandler = () => {
    setIsEdit(true);
  };

  const blurHandler = () => {
    setIsEdit(false);
  };

  return (
    <>
      <InputGroup compact>
        <Row align="middle">
          <Col>
            <StyledInputNumber
              size="large"
              min={1}
              bordered={false}
              value={amount}
              $isEdit={isEdit}
              onChange={setAmount}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </Col>

          <Col flex="1 1 auto">
            <StyledInput
              size="large"
              bordered={false}
              value={value}
              $isEdit={isEdit}
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
              placeholder="Введите название новой задачи"
            />
          </Col>

          <Col>
            <StyledButton onClick={clickHandler} size="large" type="text">
              +
            </StyledButton>
          </Col>
        </Row>
      </InputGroup>
    </>
  );
};

export default memo(TaskInput);
