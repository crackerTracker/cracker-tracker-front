import styled from 'styled-components';
import colors, { halfOpacityColors } from 'styles/colors';
import { flex } from 'styles/mixins';

export const Flex = styled.div`
  height: 100%;
  ${flex({ direction: 'column' })};
`;

export const Panel = styled.div`
  height: 100%;
  background-color: ${halfOpacityColors.lightBrown};

  border-radius: 8px;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 50px;
  background-color: ${colors.lightBrown};

  display: flex;
  justify-content: center;
  align-items: center;
`;
