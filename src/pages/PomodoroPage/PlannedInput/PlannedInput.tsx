import { Col, Dropdown, Menu, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { PlannedPomoType } from 'stores/PomodoroStore';
import { useInput } from '../useInput';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
} from './PlannedInput.style';

const PlannedInput: FC<PlannedPomoType> = ({
  _id,
  name: task,
  pomodorosAmount: amount,
}) => {
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

  const {
    deletePlannedPomo,
    deleteAllPlanned,
    editPlannedPomo,
    plannedPomosData,
    isTick,
  } = usePomodoroStore();

  useEffect(() => {
    // updating first pomo amount on markPomoDone
    if (_id === plannedPomosData[0]._id) {
      setAmount(plannedPomosData[0].pomodorosAmount);
    }
    // stack pomo amount on createPlannedPomo
    if (_id === plannedPomosData[plannedPomosData.length - 1]._id) {
      setAmount(plannedPomosData[plannedPomosData.length - 1].pomodorosAmount);
    }
  }, [plannedPomosData, setAmount, _id]);

  const menuAddPomo = () => {
    setAmount((amounts) => Number(amounts) + 1);
    editPlannedPomo(_id, value, Number(amounts) + 1);
  };

  const menuDeletePomo = () => {
    setAmount((amounts) => Number(amounts) - 1);
    deletePlannedPomo(_id);
  };

  const approveEditing = () => {
    approveChanges();
    editPlannedPomo(_id, value, Number(amounts));
  };

  const deletePomoStack = () => {
    deleteAllPlanned(_id);
    menuDeleteClick();
  };

  const isSetDisabled = () => {
    return plannedPomosData[0]._id === _id && isTick;
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick} disabled={isSetDisabled()}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={menuAddPomo}>
        Прибавить помидор
      </Menu.Item>
      <Menu.Item key="3" onClick={menuDeletePomo} disabled={amounts <= 1}>
        Убавить помидор
      </Menu.Item>
      <Menu.Item key="4" onClick={deletePomoStack} disabled={isSetDisabled()}>
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
                <StyledButton type="text" onClick={approveEditing}>
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

export default observer(PlannedInput);
