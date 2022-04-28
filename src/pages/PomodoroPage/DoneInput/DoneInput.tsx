import { Col, Dropdown, Menu, Row } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { DonePomoType } from '../ListComponent/ListComponent';
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

const DoneInput: FC<DonePomoType> = ({ task, minutes, startTime, endTime }) => {
  const format = 'HH:mm';

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
    amount: minutes,
    task,
  });

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={menuDeleteClick}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <InputGroup compact isDisabled={!isEdit}>
        <Row align="middle" wrap={false}>
          <Col flex="1 1 auto">
            <StyledInput
              value={value}
              bordered={false}
              disabled={!isEdit}
              onChange={changeHandler}
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
                    value={moment(startTime, format)}
                    bordered={false}
                    allowClear={false}
                    disabled
                  />
                  <StyledText>-</StyledText>
                  <StyledTimePicker
                    format={format}
                    value={moment(endTime, format)}
                    bordered={false}
                    allowClear={false}
                    disabled
                  />
                </StyledTimeRange>
              </Col>

              <Col>
                {!isEdit && (
                  <Dropdown overlay={menu} trigger={['click']}>
                    <StyledButton type="text">
                      &#8226;&#8226;&#8226;
                    </StyledButton>
                  </Dropdown>
                )}

                {isEdit && (
                  <>
                    <StyledButton onClick={cancelChanges} type="text">
                      &times;
                    </StyledButton>
                    <StyledButton onClick={approveChanges} type="text">
                      &#10003;
                    </StyledButton>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </InputGroup>
    </>
  );
};

export default DoneInput;
