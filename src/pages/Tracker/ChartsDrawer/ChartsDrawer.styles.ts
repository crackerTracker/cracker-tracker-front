import styled from 'styled-components';
import { commonDrawerBlockStyles, flex, scroller, square } from 'styles/mixins';
import { TrackerChartsEnum } from './config';

export const Block = styled.div`
  ${commonDrawerBlockStyles()};
  padding: 25px;
`;

export const ChartBlock = styled(Block)<{ chartType?: TrackerChartsEnum }>`
  margin-bottom: 20px;
  flex-shrink: 0;

  height: ${({ chartType = TrackerChartsEnum.pie }) =>
    chartType === TrackerChartsEnum.pie ? 540 : 600}px;

  ${flex({
    direction: 'column',
  })};
`;

export const CategoriesBlock = styled(Block)`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
`;

export const ScrollContainer = styled.div`
  ${scroller};
  ${square('100%')};
  padding: 12px 24px;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
`;
