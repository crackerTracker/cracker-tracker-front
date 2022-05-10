import styled from 'styled-components';
import colors from 'styles/colors';
import { flex } from 'styles/mixins';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 8vh 0;

  background-color: ${colors.lightBrown};
`;

export const Flex = styled.div`
  ${flex({ direction: 'column' })}
`;

export const Cards = styled.div`
  padding: 30px 0;
`;
