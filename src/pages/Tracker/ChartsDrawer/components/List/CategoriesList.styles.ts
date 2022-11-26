import styled from 'styled-components';

import { scroller, square } from 'styles/mixins';
import colors from 'styles/colors';
import { List } from 'antd';
import { Disabling } from '../ui';

export const ScrollContainer = styled(Disabling)`
  ${scroller};
  ${square('100%')};
  padding: 12px 24px;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
`;

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
