import { Col, Dropdown, Menu, Row } from 'antd';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { FC } from 'react';
import { HOURS_MINUTES_EXTENDED_FORMAT } from 'config/datesTimeFormats';
import { usePomodoroStore } from 'stores/hooks';
import { DonePomoType } from 'stores/PomodoroStore';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledText,
  StyledTimePicker,
  StyledTimeRange,
} from './DonePomoItem.style';
import { DonePomoStore } from './DonePomoStore';

type Props = {
  donePomo: DonePomoType;
};

const DonePomoItem: FC<Props> = ({
  donePomo: { id, endTime, minutesSpent, name, startTime },
}) => {
  const pomodoroStore = usePomodoroStore();

  const donePomoProps = { id, name, endTime, minutesSpent, startTime };

  const donePomoStore = useLocalObservable(
    () => new DonePomoStore(pomodoroStore, donePomoProps)
  );

  const {
    pomoName,
    isEdit,
    spentMinutes,
    startTimeMoment,
    endTimeMoment,
    approveEditing,
    deletePomoStack,
    menuEditClick,
    changeHandler,
    cancelChanges,
    setSpentMinutes,
  } = donePomoStore;

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
                value={spentMinutes}
                bordered={false}
                disabled={!isEdit}
                onChange={setSpentMinutes}
              />

              <StyledText>м &nbsp; &#8226; </StyledText>
            </Col>

            <Col>
              <StyledTimeRange>
                <StyledTimePicker
                  format={HOURS_MINUTES_EXTENDED_FORMAT}
                  value={startTimeMoment}
                  bordered={false}
                  allowClear={false}
                  disabled
                />
                <StyledText>-</StyledText>
                <StyledTimePicker
                  format={HOURS_MINUTES_EXTENDED_FORMAT}
                  value={endTimeMoment}
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
