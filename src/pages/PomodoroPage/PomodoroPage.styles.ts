import { TimerStates } from 'config/pomoconf';
import styled from 'styled-components';
import colors from 'styles/colors';

export const Wrapper = styled.div<{ timerState: TimerStates }>`
  width: 100vw;
  height: 100vh;

  background-color: ${({ timerState }) =>
    timerState === TimerStates.work
      ? colors.red
      : timerState === TimerStates.rest
      ? colors.green
      : colors.lightBrown};
`;

export const Container = styled.div`
  padding: 5vh 0;
  height: 90vh;
`;
