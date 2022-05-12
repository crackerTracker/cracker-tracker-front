import React, { useState } from 'react';
import { Panel, StyledInput } from './ControlPanel.styles';
import { Col, DatePicker, Row, Select } from 'antd';
import colors from 'styles/colors';

import IconButton from 'components/IconButton/IconButton';
import { useTrackerStore } from 'stores/hooks';
import timeValidator from 'utils/timeValidator';
import { InputStatusesEnum } from 'types/antd';
import { Moment } from 'moment';
import convertToZeroTimestamp from 'utils/convertToZeroTimestamp';
import convertSpentTimeStringToMins from 'utils/convertSpentTimeStringToMins';
import { observer } from 'mobx-react-lite';
import useTimeTrackingInput from 'utils/hooks/useTimeTrackingInput';

const ControlPanel = () => {
  const { arrayActiveCategoriesToSelect, createTask } = useTrackerStore();
  const [category, setCategory] = useState<string | null>(
    arrayActiveCategoriesToSelect.length
      ? arrayActiveCategoriesToSelect[0].value
      : null
  );
  const [categoryError, setCategoryError] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [dateError, setDateError] = useState(false);

  const { time, timeError, setTimeError, onChangeTime } =
    useTimeTrackingInput();

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeDate = (_: Moment | null, dateString: string) => {
    if (dateError) {
      setDateError(false);
    }

    setDate(dateString);
  };

  const onClickAdd = () => {
    if (!timeValidator(time.trim())) {
      setTimeError(true);
      return;
    }

    if (!date || new Date(date) > new Date()) {
      setDateError(true);
      return;
    }

    if (category === null) {
      setCategoryError(true);
      return;
    }

    timeError && setTimeError(false);
    dateError && setDateError(false);

    const minutesSpent = convertSpentTimeStringToMins(time.trim());

    const zeroTimestamp = convertToZeroTimestamp(new Date(date).getTime());

    // todo доделать обработку создания
    createTask(category, minutesSpent, zeroTimestamp);
  };

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    onClickAdd();
  };

  return (
    <Panel>
      <Row gutter={18} align="middle">
        <Col>
          <Select
            size="large"
            options={arrayActiveCategoriesToSelect}
            value={category}
            style={{ width: '140px' }}
            onChange={onChangeCategory}
            status={categoryError ? InputStatusesEnum.error : undefined}
          />
        </Col>

        <Col>
          <StyledInput
            placeholder="Время, например 2ч 15м"
            value={time}
            onChange={onChangeTime}
            status={timeError ? InputStatusesEnum.error : undefined}
            onKeyDown={onKeyDownEnter}
          />
        </Col>

        <Col>
          <DatePicker
            size="large"
            onChange={onChangeDate}
            status={dateError ? InputStatusesEnum.error : undefined}
          />
        </Col>

        <Col>
          <IconButton
            backgroundColor={colors.peach}
            color={colors.white}
            onClick={onClickAdd}
          >
            +
          </IconButton>
        </Col>
      </Row>
    </Panel>
  );
};

export default observer(ControlPanel);
