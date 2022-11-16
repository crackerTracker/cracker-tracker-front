import styled from 'styled-components';

import { square } from 'styles/mixins';
import colors from 'styles/colors';
import { List } from 'antd';

export const Color = styled.div<{ color: string }>`
  ${square('35px')};
  background-color: ${({ color }) => color};
  border: 1px solid ${colors.brown};
  border-radius: 8px;
`;

export const AntList = styled(List)`
  // List.Item
  .ant-list-item-action > li {
    font-size: 18px;
    color: ${colors.black};
  }

  // List.Item.Meta
  .ant-list-item-meta {
    align-items: center;

    &-title {
      font-size: 18px;
      font-weight: 400;
    }
  }
` as typeof List;
