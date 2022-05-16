import styled from 'styled-components';
import colors, { shadowColors } from 'styles/colors';
import { scroller } from 'styles/mixins';
import { Card } from 'antd';

export const Container = styled.div`
  flex: 1 1 auto;
  margin: 30px 0;

  overflow-y: auto;
  overflow-x: hidden;
  ${scroller}

  .ant-card {
    filter: drop-shadow(0px 6px 6px ${shadowColors.brown});
  }

  .ant-col:last-child .ant-card-head-title {
    padding: 16px 0px;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 6px;

  .ant-card-head {
    padding: 0 10px;

    border-radius: 6px 6px 0 0;
    background-color: ${shadowColors.borderSand};

    .ant-card-head-title {
      padding: 0;

      font-family: 'Montserrat';
      font-weight: 400;
      line-height: 1.3;
      font-size: 24px;
      color: ${colors.black};
    }
  }

  .ant-card-body {
    padding: 20px 10px;
  }
`;

export const WeekDate = styled.span`
  font-family: inherit;
  font-size: 48px;
`;
