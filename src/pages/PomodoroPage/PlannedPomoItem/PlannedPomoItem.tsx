import { Col, Dropdown, Menu, Row } from 'antd';
import { TimerStates } from 'config/pomoconf';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { PlannedPomoType } from 'stores/PomodoroStore';
import { usePomoItem } from '../usePomoItem';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
} from './PlannedPomoItem.style';

const PlannedPomoItem: FC<PlannedPomoType> = ({
  _id,
  name,
  pomodorosAmount,
}) => {
  const {
    pomoName,
    amount,
    isEdit,
    setAmount,
    menuEditClick,
    menuDeleteClick,
    changeHandler,
    cancelChanges,
    approveChanges,
  } = usePomoItem({
    name,
    defaultAmount: pomodorosAmount,
  });

  const {
    deletePlannedPomo,
    deleteAllPlanned,
    editPlannedPomo,
    markPomoDone,
    plannedPomosData,
    timerState,
  } = usePomodoroStore();

  useEffect(() => {
    if (_id === plannedPomosData[0]._id) {
      setAmount(plannedPomosData[0].pomodorosAmount);
    }
    if (_id === plannedPomosData[plannedPomosData.length - 1]._id) {
      setAmount(plannedPomosData[plannedPomosData.length - 1].pomodorosAmount);
    }
  }, [plannedPomosData, _id]);

  const menuAddPomo = () => {
    setAmount((amount) => Number(amount) + 1);
    editPlannedPomo(_id, pomoName, Number(amount) + 1);
  };

  const menuDeletePomo = () => {
    setAmount((amount) => Number(amount) - 1);
    deletePlannedPomo(_id);
  };

  const approveEditing = () => {
    approveChanges();
    editPlannedPomo(_id, pomoName, Number(amount));
  };

  const deletePomoStack = () => {
    deleteAllPlanned(_id);
    menuDeleteClick();
  };

  const isSetDisabled = () => {
    return plannedPomosData[0]._id === _id && timerState === TimerStates.work;
  };

  const calculateTime = () => {
    const spentMs = 50 * 60000;
    const endTime = new Date();
    const endTimeStamp = endTime.toISOString();

    const startTime = new Date(endTime.getTime() - spentMs);
    const startTimeStamp = startTime.toISOString();

    return { endTimeStamp, startTimeStamp };
  };

  const menuMarkDone = () => {
    const { endTimeStamp, startTimeStamp } = calculateTime();
    return markPomoDone(_id, 50, startTimeStamp, endTimeStamp);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick} disabled={isSetDisabled()}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={menuMarkDone} disabled={isSetDisabled()}>
        Отметить выполненным
      </Menu.Item>
      <Menu.Item key="3" onClick={menuAddPomo}>
        Прибавить помидор
      </Menu.Item>
      <Menu.Item key="4" onClick={menuDeletePomo} disabled={amount <= 1}>
        Убавить помидор
      </Menu.Item>
      <Menu.Item key="5" onClick={deletePomoStack} disabled={isSetDisabled()}>
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
              value={amount}
              onChange={setAmount}
            />
          </Col>

          <Col flex="1 1 auto">
            <StyledInput
              value={pomoName}
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

export default observer(PlannedPomoItem);
