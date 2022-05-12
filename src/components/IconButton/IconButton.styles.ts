import styled, { css } from 'styled-components';
import { animate, backgroundImageContain, square } from 'styles/mixins';

export const StyledButton = styled.div<{
  backgroundColor: string;
  hoverColor?: string;
  squareSide: string;
  paddings: string;
  color: string;
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
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${animate('opacity')};

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
