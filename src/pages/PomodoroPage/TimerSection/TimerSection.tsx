import { Button, Col, Row, Select } from 'antd';
import React, { FC } from 'react';
import {
  Container,
  CurrentTask,
  SelectTime,
  StatsContainer,
  Timer,
} from './TimerSection.style';
import CustomButton from 'components/Button';
import { useTimer } from '../useTimer';
import colors from 'styles/colors';
import { usePomodoroStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

const TimerSection: FC = () => {
  const {
    computePlanTime,
    computeDoneTime,
    donePomosAmount,
    plannedPomosAmount,
    taskName,
    isTick,
  } = usePomodoroStore();

  const {
    startTimer,
    stopTimer,
    addMinutes,
    diffMinutes,
    seconds,
    minutes,
    option,
    setOption,
  } = useTimer();

  const options = [
    { value: '1', label: '1 минута' },
    { value: '5', label: '5 минут' },
    { value: '10', label: '10 минут' },
    { value: '20', label: '20 минут' },
  ];

  return (
    <Container>
      <CurrentTask>{taskName}</CurrentTask>
      <Timer>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Timer>

      <Row justify="center" gutter={[12, 24]}>
        <Col span={10}>
          <CustomButton
            onClick={startTimer}
            isDisabled={!plannedPomosAmount || isTick}
            styles={{
              verticalMargins: '0px',
              bgCol: `${colors.green}`,
              minWidth: '180px',
            }}
          >
            Старт
          </CustomButton>
        </Col>

        <Col span={10}>
          <CustomButton
            onClick={stopTimer}
            isDisabled={!isTick}
            styles={{
              verticalMargins: '0px',
              bgCol: `${colors.red}`,
              minWidth: '180px',
            }}
          >
            {isTick ? 'Готово' : 'Стоп'}
          </CustomButton>
        </Col>

        <Col span={10}>
          <SelectTime>
            <Button
              style={{ width: '40px' }}
              onClick={addMinutes}
              disabled={isTick}
            >
              +
            </Button>
            <Select
              options={options}
              value={option.add}
              style={{ width: '140px' }}
              onChange={(v) => setOption({ ...option, add: v })}
              disabled={isTick}
            />
          </SelectTime>
        </Col>

        <Col span={10}>
          <SelectTime>
            <Button
              style={{ width: '40px' }}
              onClick={diffMinutes}
              disabled={isTick}
            >
              -
            </Button>
            <Select
              options={options}
              value={option.diff}
              style={{ width: '140px' }}
              onChange={(v) => setOption({ ...option, diff: v })}
              disabled={isTick}
            />
          </SelectTime>
        </Col>
      </Row>

      <Row justify="center" gutter={[0, 18]}>
        <Col span={16}>
          <StatsContainer>
            <div>Запланировано</div>
            <div>
              <span>{plannedPomosAmount}&times;&#127813;</span>
              {plannedPomosAmount > 0 && (
                <span> &#8226; {computePlanTime()}</span>
              )}
            </div>
          </StatsContainer>
        </Col>
        <Col span={16}>
          <StatsContainer>
            <div>Выполнено</div>
            <div>
              <span>{donePomosAmount}&times;&#127813;</span>
              {donePomosAmount > 0 && <span> &#8226; {computeDoneTime()}</span>}
            </div>
          </StatsContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(TimerSection);
