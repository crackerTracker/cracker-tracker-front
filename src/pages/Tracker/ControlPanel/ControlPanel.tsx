import React, { ChangeEvent, useState } from 'react';
import { Panel, StyledInput } from './ControlPanel.styles';
import { Col, DatePicker, Divider, Row, Select } from 'antd';
import colors from 'styles/colors';

import IconButton from 'components/IconButton/IconButton';
import { useTrackerStore } from 'stores/hooks';
import timeValidator from 'utils/timeValidator';
import { InputStatusesEnum } from 'types/antd';

const mockOptions: { label: string; value: string }[] = [
  {
    label: 'Frontend',
    value: 'Frontend',
  },
  {
    label: 'Backend',
    value: 'Backend',
  },
  {
    label: 'University',
    value: 'University',
  },
];

const ControlPanel = () => {
  const { arrayActiveCategoriesToSelect } = useTrackerStore();
  const [category, setCategory] = useState(mockOptions[0].value);
  const [time, setTime] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [date, setDate] = useState('');

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);

    if (timeError) {
      setTimeError(false);
    }
  };

  const onChangeDate = (_: any, dateString: string) => {
    setDate(dateString);
  };

  const onClickAdd = () => {
    if (!timeValidator(time)) {
      setTimeError(true);
    } else {
      setTimeError(false);
    }

    // todo
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
          <DatePicker size="large" onChange={onChangeDate} />
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

export default ControlPanel;
