import styled, { css } from 'styled-components';
import { animate, square } from 'styles/mixins';
import { List } from 'antd';
import { hoverColors } from 'styles/colors';

export const StyledListItem = styled(List.Item)`
  display: flex;
  ${animate('background-color')};

  &:hover {
    cursor: pointer;
    background-color: ${hoverColors.blueHover};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const Color = styled.div<{ color?: string }>`
  ${square('10px')};
  margin: -3px 10px 0 0;

  border-radius: 50%;

  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}

  ${animate('width', 'height')};

  ${StyledListItem}:hover & {
    ${square('15px')};
  }
`;
