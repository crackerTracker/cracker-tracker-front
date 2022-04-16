import { css } from 'styled-components';
import { shadowColors } from './colors';

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

export const text = css`
  font-size: 19px;
  line-height: 23px;
`;
