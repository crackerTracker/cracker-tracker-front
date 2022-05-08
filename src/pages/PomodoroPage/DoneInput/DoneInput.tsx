import { Col, Dropdown, Menu, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { DonePomoType } from 'stores/PomodoroStore';
import { useInput } from '../useInput';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledText,
  StyledTimePicker,
  StyledTimeRange,
} from './DoneInput.style';

const DoneInput: FC<DonePomoType> = ({
  _id,
  name,
  minutesSpent,
  startTime,
  endTime,
}) => {
  const format = 'HH:mm';

  const { editDonePomo, deleteDonePomo } = usePomodoroStore();

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
    amount: minutesSpent,
    task: name,
  });

  const endTimeString = new Date(endTime).toLocaleTimeString().slice(0, -3);
  const startTimeString = new Date(startTime).toLocaleTimeString().slice(0, -3);

  const approveEditing = () => {
    editDonePomo(_id, value, Number(amounts));
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
            value={value}
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
                value={amounts}
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
                  value={moment(startTimeString, format)}
                  bordered={false}
                  allowClear={false}
                  disabled
                />
                <StyledText>-</StyledText>
                <StyledTimePicker
                  format={format}
                  value={moment(endTimeString, format)}
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

export default observer(DoneInput);
