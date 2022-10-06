import { Button, Col, Row, Select } from 'antd';
import React, { FC, useMemo } from 'react';
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
import { OptionsEnum, TimerStatesEnum } from 'config/pomoconf';
import { getHHmmFormatTimeString } from 'utils/getHHmmFormatTimeString';

const TimerSection: FC = () => {
  const {
    planTime,
    doneTime,
    donePomosAmount,
    plannedPomosAmount,
    taskName,
    timerState,
  } = usePomodoroStore();

  const {
    startTimer,
    stopTimer,
    addMinutes,
    diffMinutes,
    changePomoSeries,
    seconds,
    minutes,
    option,
    setOption,
  } = useTimer();

  const options = useMemo(
    () =>
      Object.entries(OptionsEnum).map((entry) => ({
        value: entry[0],
        label: entry[1],
      })),
    []
  );

  const onTimerStart = () => {
    startTimer();
    changePomoSeries();
  };

  return (
    <Container>
      <CurrentTask>{taskName}</CurrentTask>
      <Timer>{getHHmmFormatTimeString(minutes, seconds)}</Timer>

      <Row justify="center" gutter={[12, 24]}>
        <Col span={10}>
          <CustomButton
            onClick={onTimerStart}
            isDisabled={
              !plannedPomosAmount || timerState !== TimerStatesEnum.off
            }
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
            isDisabled={timerState === TimerStatesEnum.off}
            styles={{
              verticalMargins: '0px',
              bgCol: `${colors.red}`,
              minWidth: '180px',
            }}
          >
            {timerState === TimerStatesEnum.work ? 'Готово' : 'Стоп'}
          </CustomButton>
        </Col>

        <Col span={10}>
          <SelectTime>
            <Button
              style={{ width: '40px' }}
              onClick={addMinutes}
              disabled={timerState !== TimerStatesEnum.off}
            >
              +
            </Button>
            <Select
              options={options}
              value={option.add}
              style={{ width: '140px' }}
              onChange={(v) => setOption({ ...option, add: v })}
              disabled={timerState !== TimerStatesEnum.off}
            />
          </SelectTime>
        </Col>

        <Col span={10}>
          <SelectTime>
            <Button
              style={{ width: '40px' }}
              onClick={diffMinutes}
              disabled={timerState !== TimerStatesEnum.off}
            >
              -
            </Button>
            <Select
              options={options}
              value={option.diff}
              style={{ width: '140px' }}
              onChange={(v) => setOption({ ...option, diff: v })}
              disabled={timerState !== TimerStatesEnum.off}
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
              {plannedPomosAmount > 0 && <span> &#8226; {planTime}</span>}
            </div>
          </StatsContainer>
        </Col>
        <Col span={16}>
          <StatsContainer>
            <div>Выполнено</div>
            <div>
              <span>{donePomosAmount}&times;&#127813;</span>
              {donePomosAmount > 0 && <span> &#8226; {doneTime}</span>}
            </div>
          </StatsContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(TimerSection);
