import styled from 'styled-components';
import colors, { halfOpacityColors } from 'styles/colors';
import { flex, scroller, square } from 'styles/mixins';
import { List, Row } from 'antd';

export const Container = styled.div`
  position: relative;
  ${square('100%')};
  overflow: hidden;
`;

export const Flex = styled.div`
  height: 100%;
  ${flex({ direction: 'column' })};
`;

export const ListsWrapper = styled(Row)`
  flex-grow: 1;
  overflow: hidden;
`;

export const Panel = styled.div`
  height: 100%;
  background-color: ${halfOpacityColors.lightBrown};

  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const StyledList = styled(List)`
  overflow: auto;
  ${scroller};
`;

export const Header = styled.div`
  flex-shrink: 0;

  height: 50px;
  background-color: ${colors.lightBrown};

  display: flex;
  justify-content: center;
  align-items: center;
`;
