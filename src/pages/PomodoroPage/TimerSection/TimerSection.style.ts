import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, inputShadow, lightPanelShadow } from 'styles/mixins';

const timerWidth = 'calc(100vw / 24 * 1.7)';

export const Container = styled.div`
  height: 100%;

  color: ${colors.textBlack};

  border-radius: 8px;
  background-color: ${colors.white};
  ${lightPanelShadow}
`;

export const CurrentTask = styled.div`
  padding-top: 13px;

  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  opacity: 0.5;
`;

export const Timer = styled.div`
  padding: 60px 0;

  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: ${timerWidth};
  line-height: calc(${timerWidth} + 25%);
`;

export const SelectTime = styled.div`
  ${flex({ justify: 'center' })}
  margin-bottom: 7vh;
`;

export const StatsContainer = styled.div`
  width: 100%;
  padding: 12px 16px;

  ${flex({ justify: 'space-between' })}

  border-radius: 8px;
  background-color: ${colors.lightBrown};
  ${inputShadow}
`;
