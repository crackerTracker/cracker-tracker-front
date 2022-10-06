import { TimerStatesEnum } from 'config/pomoconf';
import styled from 'styled-components';
import colors from 'styles/colors';
import { animate } from 'styles/mixins';

export const Wrapper = styled.div<{ timerState: TimerStatesEnum }>`
  width: 100vw;
  height: 100vh;

  background-color: ${({ timerState }) =>
    timerState === TimerStatesEnum.work
      ? colors.red
      : timerState === TimerStatesEnum.rest
      ? colors.green
      : colors.lightBrown};

  ${animate('background-color')};
`;

export const Container = styled.div`
  padding: 5vh 0;
  height: 90vh;
`;
