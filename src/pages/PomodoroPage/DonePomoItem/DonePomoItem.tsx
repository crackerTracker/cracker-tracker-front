import { Col, Dropdown, Menu, Row } from 'antd';
import { format } from 'config/pomoconf';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { DonePomoType } from 'stores/PomodoroStore';
import { usePomoItem } from '../usePomoItem';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledText,
  StyledTimePicker,
  StyledTimeRange,
} from './DonePomoItem.style';

const DonePomoItem: FC<DonePomoType> = ({
  _id,
  name,
  minutesSpent,
  startTime,
  endTime,
}) => {
  const { editDonePomo, deleteDonePomo } = usePomodoroStore();

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
    defaultAmount: minutesSpent,
    name,
  });

  const memoStartMoment = useMemo(() => {
    const startTimeString = new Date(startTime)
      .toLocaleTimeString()
      .slice(0, -3);
    return moment(startTimeString, format);
  }, [startTime]);

  const memoEndMoment = useMemo(() => {
    const endTimeString = new Date(endTime).toLocaleTimeString().slice(0, -3);
    return moment(endTimeString, format);
  }, [endTime]);

  const approveEditing = () => {
    editDonePomo(_id, pomoName, Number(amount));
    approveChanges();
  };

  const deletePomoStack = () => {
    deleteDonePomo(_id);
    menuDeleteClick();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={deletePomoStack}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <InputGroup compact isDisabled={!isEdit}>
      <Row align="middle" wrap={false}>
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
          <Row>
            <Col>
              <StyledInputNumber
                min={1}
                value={amount}
                bordered={false}
                disabled={!isEdit}
                onChange={setAmount}
              />

              <StyledText>м &nbsp; &#8226; </StyledText>
            </Col>

            <Col>
              <StyledTimeRange>
                <StyledTimePicker
                  format={format}
                  value={memoStartMoment}
                  bordered={false}
                  allowClear={false}
                  disabled
                />
                <StyledText>-</StyledText>
                <StyledTimePicker
                  format={format}
                  value={memoEndMoment}
                  bordered={false}
                  allowClear={false}
                  disabled
                />
              </StyledTimeRange>
            </Col>

            <Col>
              {!isEdit && (
                <Dropdown overlay={menu} trigger={['click']}>
                  <StyledButton type="text">&#8226;&#8226;&#8226;</StyledButton>
                </Dropdown>
              )}

              {isEdit && (
                <>
                  <StyledButton onClick={cancelChanges} type="text">
                    &times;
                  </StyledButton>
                  <StyledButton onClick={approveEditing} type="text">
                    &#10003;
                  </StyledButton>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </InputGroup>
  );
};

export default observer(DonePomoItem);
