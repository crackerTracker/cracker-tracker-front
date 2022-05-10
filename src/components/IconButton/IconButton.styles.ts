import styled, { css } from 'styled-components';
import { animate, flex, square } from '../../styles/mixins';

export const StyledButton = styled.div<{
  backgroundColor: string;
  squareSide: string;
  color: string;
  isDisabled: boolean;
}>`
  padding: 10px;
  border-radius: 4px;
  font-size: 40px;

  ${({ backgroundColor }) =>
    css`
      background-color: ${backgroundColor};
    `}

  ${({ squareSide }) =>
    css`
      ${square(squareSide)};
    `}

  ${({ color }) =>
    css`
      color: ${color};
    `}

  ${flex({ justify: 'center', align: 'center' })}
  overflow: hidden;

  ${animate('opacity')};

  ${({ isDisabled }) =>
    css`
      opacity: ${isDisabled ? '0.7' : '1'};

      :hover {
        cursor: ${isDisabled ? 'default' : 'pointer'};
        opacity: 0.7;
      }
    `}
`;

export const Image = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;

  ${({ image }) =>
    css`
      background: url(${image}) no-repeat center/contain;
    `}
`;
