import styled, { css } from 'styled-components';
import { animate, backgroundImageContain, flex, square } from 'styles/mixins';

export const StyledButton = styled.div<{
  backgroundColor: string;
  hoverColor?: string;
  squareSide: string;
  paddings: string;
  color: string;
  isDisabled: boolean;
}>`
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

  ${({ paddings }) =>
    css`
      padding: ${paddings};
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
  ${({ hoverColor }) =>
    hoverColor
      ? css`
          :hover {
            cursor: pointer;
            background-color: ${hoverColor};
          }
        `
      : css`
          :hover {
            cursor: pointer;
            opacity: 0.7;
          }
        `}
`;

export const Image = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;

  ${({ image }) =>
    css`
      ${backgroundImageContain(image)};
    `}
`;
