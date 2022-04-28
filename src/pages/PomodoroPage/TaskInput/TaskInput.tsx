import { Col, Input, Row } from 'antd';
import React, { FC, FormEvent, useState } from 'react';
import { InputGroup, StyledButton, StyledInputNumber } from './TaskInput.style';

const TaskInput: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [amount, setAmount] = useState<string | number>('');

  const clickHandler = () => {
    console.log('sending data...');
    console.log(value, amount);

    setValue('');
    setAmount('');
    setIsEdit(false);
  };

  const approveChanges = () => {
    setValue(value);
    setAmount(amount);
    setIsEdit(false);
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
        <Row>
          <Col>
            <StyledInputNumber
              size="large"
              min={1}
              bordered={false}
              value={amount}
              onChange={setAmount}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </Col>

          <Col flex="1 1 auto">
            <Input
              size="large"
              bordered={false}
              value={value}
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </Col>

          {isEdit && (
            <Col>
              <StyledButton onClick={approveChanges} size="large" type="text">
                &#10003;
              </StyledButton>
            </Col>
          )}

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

export default TaskInput;
