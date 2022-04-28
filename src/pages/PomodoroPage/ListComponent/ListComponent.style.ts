import { List } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, lightPanelShadow, scroller } from 'styles/mixins';

export const Container = styled.div`
  height: 90vh;

  border-radius: 8px;
  border: 1px solid ${colors.lightBrown};
  background-color: ${colors.white};
  ${lightPanelShadow};

  .ant-list {
    .ant-spin-nested-loading {
      height: 33vh;
      overflow: auto;
      ${scroller}
    }
    :last-child {
      ${flex({ direction: 'column' })};

      // attaching footer to the bottom
      .ant-spin-nested-loading {
        flex: 1 1 auto;
      }
    }
  }
`;

export const StyledList = styled(List)`
  font-family: inherit;
  color: ${colors.textBlack};
  border: none;

  :first-child {
    height: 40vh;
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    height: 50vh;
    border-radius: 0 0 8px 8px;
  }
`;

export const Title = styled.div`
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
`;
