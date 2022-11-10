import styled from 'styled-components';
import { commonDrawerBlockStyles, flex } from 'styles/mixins';
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
  flex-grow: 1;
`;
