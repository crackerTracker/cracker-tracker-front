import styled, { css } from 'styled-components';
import { square } from 'styles/mixins';

// todo доделать кружок цвета категории
export const Category = styled.div<{ color?: string }>`
  position: relative;

  &::before {
    position: absolute;
    content: '';
    ${square('10px')};
    top: 0;
    left: 0;

    ${({ color }) =>
      color &&
      css`
        background-color: ${color};
      `}
  }
`;
