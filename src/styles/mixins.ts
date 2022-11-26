import { css } from 'styled-components';
import colors, { halfOpacityColors, shadowColors } from './colors';

export const square = (value: string) => css`
  width: ${value};
  height: ${value};
`;

type FlexProps = {
  direction?: string;
  align?: string;
  justify?: string;
};

export const flex = ({ direction, align, justify }: FlexProps) => css`
  display: flex;

  ${direction &&
  css`
    flex-direction: ${direction};
  `}

  ${align &&
  css`
    align-items: ${align};
  `}

  ${justify &&
  css`
    justify-content: ${justify};
  `}
`;

export const lightPanelShadow = css`
  box-shadow: 0px 0px 20px 1px ${shadowColors.darkBrown};
`;

export const lightElementShadow = css`
  box-shadow: 0px 1px 4px ${shadowColors.grey};
`;

export const inputShadow = css`
  box-shadow: 0px 1px 6px ${shadowColors.grey};
`;

export const text = css`
  font-size: 19px;
  line-height: 23px;
`;

export const scroller = css`
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    outline: 1px solid ${colors.lightBrown};
    border-radius: 4px;
    background-color: ${colors.white};
    box-shadow: inset 0px 0px 20px 1px ${shadowColors.darkBrown};
    -webkit-box-shadow: inset 0px 0px 20px 1px ${shadowColors.darkBrown};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollBrown};
    border-radius: 4px;
  }
`;

export const animate = (...styles: string[]) => css`
  ${styles.length
    ? `transition: ${styles.map((style) => `${style} 0.1s linear`)}`
    : null}
`;

export const centerPosY = () => css`
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

export const centerPosX = () => css`
  left: 50%;
  transform: translate3d(-50%, 0, 0);
`;

export const centerPos = () => css`
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

export const backgroundImageContain = (src: string) => css`
  background: url(${src}) no-repeat center/contain;
`;

export const commonDrawerBlockStyles = () => css`
  background-color: ${halfOpacityColors.lightBrown};
  border-radius: 8px;
`;
