import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, scroller } from 'styles/mixins';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 8vh 0;

  background-color: ${colors.lightBrown};
`;

export const Flex = styled.div`
  height: 100%;
  ${flex({ direction: 'column' })};
`;

export const ControlPanelWrapper = styled.div`
  flex-shrink: 0;
  z-index: 1;
`;

export const Relative = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  ${scroller};
`;

export const Cards = styled.div`
  padding: 30px 0;
`;
