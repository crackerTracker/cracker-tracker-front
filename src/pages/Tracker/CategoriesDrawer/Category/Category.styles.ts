import styled, { css } from 'styled-components';
import { animate, flex, square } from 'styles/mixins';
import { List } from 'antd';
import { transparentColors } from 'styles/colors';

export const StyledListItem = styled(List.Item)<{ $isEdited: boolean }>`
  display: flex;
  justify-content: center;
  ${animate('background-color')};

  ${({ $isEdited }) =>
    $isEdited
      ? css`
          background-color: ${transparentColors.blueHover};
        `
      : css`
          &:hover {
            cursor: pointer;
            background-color: ${transparentColors.blueHover};
          }
        `};
`;

export const Content = styled.div`
  display: flex;
  ${flex({
    align: 'center',
    justify: 'center',
  })};

  max-width: 150px;
`;

export const Color = styled.div<{ color?: string; isEdited: boolean }>`
  ${({ isEdited }) =>
    isEdited
      ? css`
          ${square('15px')}
        `
      : css`
          ${square('10px')};
        `};

  margin: -3px 10px 0 0;

  border-radius: 50%;

  flex-shrink: 0;

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
