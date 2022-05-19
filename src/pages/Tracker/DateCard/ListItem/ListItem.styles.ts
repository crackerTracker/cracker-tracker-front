import styled, { css } from 'styled-components';
import { animate, square } from 'styles/mixins';
import { Input, List } from 'antd';
import colors, { transparentColors } from 'styles/colors';

export const StyledListItem = styled(List.Item)`
  display: flex;
  ${animate('background-color')};

  &:hover {
    cursor: pointer;
    background-color: ${transparentColors.blueHover};
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

export const EditContainer = styled.div`
  position: relative;

  display: flex;
  flex-wrap: wrap;
`;

export const StyledInput = styled(Input).attrs({ size: 'middle' })`
  width: 100px;
  margin-right: 10px;
  flex-grow: 1;

  ::placeholder {
    color: ${colors.peach};
  }
`;

export const Buttons = styled.div`
  position: absolute;
  right: -0px;
  transform: translate3d(100%, 0, 0);
  top: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;
