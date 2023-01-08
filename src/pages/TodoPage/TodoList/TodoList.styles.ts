import { List } from 'antd';
import styled from 'styled-components';
import { shadowColors } from 'styles/colors';
import { flex, scroller } from 'styles/mixins';

export const Todos = styled.div`
  margin-top: 45px;
  margin-bottom: 22px;

  ${flex({ direction: 'column' })}
  flex: 1 1 auto;

  overflow: auto;
  ${scroller}
`;

export const StyledList = styled(List)`
  border: none;

  .ant-list-item {
    border: 1px solid ${shadowColors.borderSand};
  }
`;
