import styled from 'styled-components';
import { Row, Space } from 'antd';

export const NoShrinkRow = styled(Row)`
  flex-shrink: 0;
` as typeof Row;

export const NoShrink = styled(Space)`
  flex-shrink: 0;
` as typeof Space;
