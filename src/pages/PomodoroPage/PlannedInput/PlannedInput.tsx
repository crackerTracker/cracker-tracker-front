import { Col, Dropdown, Menu, Row } from 'antd';
import React, { FC, memo } from 'react';
import { PlannedPomoType } from '../ListComponent/ListComponent';
import { useInput } from '../useInput';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
} from './PlannedInput.style';

const PlannedInput: FC<PlannedPomoType> = ({ task, amount }) => {
  const {
    value,
    amounts,
    isEdit,
    setAmount,
    menuEditClick,
    menuDeleteClick,
    changeHandler,
    cancelChanges,
    approveChanges,
  } = useInput({
    amount,
    task,
  });

  const menuAddPomo = () => {
    setAmount((amounts) => Number(amounts) + 1);
  };

  const menuDeletePomo = () => {
    setAmount((amounts) => Number(amounts) - 1);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={menuAddPomo}>
        Прибавить помидор
      </Menu.Item>
      <Menu.Item key="3" onClick={menuDeletePomo} disabled={amounts <= 1}>
        Убавить помидор
      </Menu.Item>
      <Menu.Item key="4" onClick={menuDeleteClick}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <InputGroup compact isDisabled={!isEdit}>
        <Row>
          <Col flex="0 1 auto">
            <StyledInputNumber
              min={1}
              disabled={!isEdit}
              bordered={false}
              value={amounts}
              onChange={setAmount}
            />
          </Col>

          <Col flex="1 1 auto">
            <StyledInput
              value={value}
              bordered={false}
              disabled={!isEdit}
              onChange={changeHandler}
              placeholder="Без названия"
            />
          </Col>

          <Col flex="0 1 auto">
            {!isEdit && (
              <Dropdown overlay={menu} trigger={['click']}>
                <StyledButton type="text">&#8226;&#8226;&#8226;</StyledButton>
              </Dropdown>
            )}

            {isEdit && (
              <>
                <StyledButton type="text" onClick={cancelChanges}>
                  &times;
                </StyledButton>
                <StyledButton type="text" onClick={approveChanges}>
                  &#10003;
                </StyledButton>
              </>
            )}
          </Col>
        </Row>
      </InputGroup>
    </>
  );
};

export default memo(PlannedInput);
