import React, { ChangeEvent, useState } from 'react';
import { Panel, StyledInput } from './ControlPanel.styles';
import { Col, DatePicker, Divider, Row, Select } from 'antd';
import colors from 'styles/colors';

import IconButton from 'components/IconButton/IconButton';
import { useTrackerStore } from 'stores/hooks';
import timeValidator from 'utils/timeValidator';
import { InputStatusesEnum } from 'types/antd';
import { Moment } from 'moment';
import convertToZeroTimestamp from 'utils/convertToZeroTimestamp';
import convertSpentTimeStringToMins from 'utils/convertSpentTimeStringToMins';
import { observer } from 'mobx-react-lite';

const ControlPanel = () => {
  const { arrayActiveCategoriesToSelect, createTask } = useTrackerStore();
  const [category, setCategory] = useState<string | null>(
    arrayActiveCategoriesToSelect.length
      ? arrayActiveCategoriesToSelect[0].value
      : null
  );
  const [categoryError, setCategoryError] = useState(false);
  const [time, setTime] = useState('2h 2m');
  const [timeError, setTimeError] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [dateError, setDateError] = useState(false);

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);

    if (timeError) {
      setTimeError(false);
    }
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

        <Divider
          type="vertical"
          style={{ height: '50px', backgroundColor: colors.peach }}
        />

        {/*todo оставить ли навигацию по дням */}
        <Col>
          <DatePicker size="large" picker="month" />
        </Col>
      </Row>
    </Panel>
  );
};

export default observer(ControlPanel);
