import React, { ChangeEvent, useRef, useState } from 'react';
import { Date, DateDisplay, Panel, StyledInput } from './ControlPanel.styles';
import { Col, DatePicker, Divider, Row, Select } from 'antd';
import colors from '../../../styles/colors';

import IconButton from '../../../components/IconButton/IconButton';
import { images } from '../../../img/icons';
import { PickerComponentClass } from 'antd/es/date-picker/generatePicker/interface';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import moment, { Moment } from 'moment';

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
  const [category, setCategory] = useState(mockOptions[0].value);
  const [time, setTime] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [date, setDate] = useState('');

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const onChangeDate = (_: any, dateString: string) => {
    setDate(dateString);
  };

  const onClick = () => {};

  return (
    <Panel>
      <Row gutter={18} align="middle">
        <Col>
          <Select
            size="large"
            options={mockOptions}
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
          />
        </Col>

        <Col>
          <DatePicker size="large" onChange={onChangeDate} />
        </Col>

        <Col>
          <IconButton
            backgroundColor={colors.peach}
            color={colors.white}
            onClick={onClick}
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
