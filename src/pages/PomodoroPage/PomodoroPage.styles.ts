import styled from 'styled-components';
import colors from 'styles/colors';

type Props = {
  isTick: boolean;
};

export const Wrapper = styled.div<Props>`
  margin: 0 auto;
  width: 100vw;
  height: 100vh;

  background-color: ${({ isTick }) =>
    isTick ? colors.green : colors.lightBrown};
`;

export const Container = styled.div`
  padding: 5vh 0;
  height: 90vh;
`;
