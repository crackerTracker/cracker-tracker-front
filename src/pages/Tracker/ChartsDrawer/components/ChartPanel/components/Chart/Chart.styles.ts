import styled from 'styled-components';
import {
  LightCenteredText,
  Disabling,
} from 'pages/Tracker/ChartsDrawer/components/ui';
import { animate, centerPos, square } from 'styles/mixins';

export const Wrapper = styled.div`
  flex: 1 0 0;
  position: relative;
  margin-top: 16px;
`;

export const MessageContainer = styled(LightCenteredText)<{ visible: boolean }>`
  position: absolute;
  pointer-events: none;
  ${animate('opacity')};
  ${centerPos};

  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export const DisablingContainer = styled(Disabling)`
  ${square('100%')};
`;
