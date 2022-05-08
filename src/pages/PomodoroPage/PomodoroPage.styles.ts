import styled from 'styled-components';
import colors from 'styles/colors';

export const Wrapper = styled.div<{ isTick: boolean }>`
  width: 100vw;
  height: 100vh;

  background-color: ${({ isTick }) =>
    isTick ? colors.red : colors.lightBrown};
`;

export const Container = styled.div`
  padding: 5vh 0;
  height: 90vh;
`;
