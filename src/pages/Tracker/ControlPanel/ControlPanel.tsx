import React, { useState } from 'react';
import { Panel, StyledInput } from './ControlPanel.styles';
import { Col, DatePicker, Row, Select } from 'antd';
import colors from 'styles/colors';

import IconButton from 'components/IconButton';
import { useTrackerStore } from 'stores/hooks';
import timeValidator from 'utils/timeValidator';
import { InputStatusesEnum } from 'types/antd';
import { Moment } from 'moment';
import convertSpentTimeStringToMins from 'utils/convertSpentTimeStringToMins';
import { observer } from 'mobx-react-lite';
import useTimeTrackingInput from 'utils/hooks/useTimeTrackingInput';

const ControlPanel = () => {
  const { arrayActiveCategoriesToSelect, addTask } = useTrackerStore();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState(false);
  const [date, setDate] = useState<{
    moment: Moment | null;
    dateString: string;
  }>({ moment: null, dateString: '' });
  const [dateError, setDateError] = useState(false);

  const { time, setTime, timeError, setTimeError, onChangeTime } =
    useTimeTrackingInput();

  const resetControlPanel = () => {
    timeError && setTimeError(false);
    dateError && setDateError(false);
    categoryError && setCategoryError(false);
    setCategoryId(null);
    setTime('');
    setDate({
      moment: null,
      dateString: '',
    });
  };

  const onChangeCategory = (value: string) => {
    setCategoryId(value);
  };

  const onChangeDate = (moment: Moment | null, dateString: string) => {
    if (dateError) {
      setDateError(false);
    }

    setDate({
      moment,
      dateString,
    });
  };

  const onClickAdd = async () => {
    if (!timeValidator(time.trim())) {
      setTimeError(true);
      return;
    }

    const dateString = date.dateString;
    const dateMoment = date.moment;
    if (!dateMoment || !dateString || new Date(dateString) > new Date()) {
      setDateError(true);
      return;
    }

    if (categoryId === null) {
      setCategoryError(true);
      return;
    }

    resetControlPanel();

    const minutesSpent = convertSpentTimeStringToMins(time.trim());

    await addTask(categoryId, minutesSpent, dateMoment.toDate());
  };

  const onKeyDownEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    await onClickAdd();
  };

  return (
    <Panel>
      <Row gutter={18} align="middle">
        <Col>
          <Select
            placeholder="Категория"
            size="large"
            options={arrayActiveCategoriesToSelect}
            value={categoryId}
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
            value={date.moment}
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
