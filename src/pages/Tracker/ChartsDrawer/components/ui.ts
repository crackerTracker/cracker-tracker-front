import styled, { css } from 'styled-components';
import Spinner from 'components/Spinner';
import { animate, centerPos } from 'styles/mixins';
import { SpinnerSizesEnum } from 'components/Spinner';
import colors from 'styles/colors';

export const Loader = styled(Spinner).attrs({
  size: SpinnerSizesEnum.xl,
})<{ visible: boolean }>`
  position: absolute;
  opacity: 1;
  pointer-events: none;
  ${animate('opacity')};
  ${centerPos};

  ${({ visible }) =>
    !visible &&
    css`
      opacity: 0;
    `}
`;

export const LightCenteredText = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${colors.brown};

  pointer-events: none;
`;

export const Disabling = styled.div<{ turnOnDisabling: boolean }>`
  ${animate('opacity')};

  opacity: ${({ turnOnDisabling }) => (turnOnDisabling ? 0.5 : 1)};

  ${({ turnOnDisabling }) =>
    turnOnDisabling &&
    css`
      pointer-events: none;
    `}
`;
