import styled from 'styled-components';
import { DatePicker } from 'antd';

export const AntdRangePicker = styled(DatePicker.RangePicker)`
  position: absolute;
  padding: 0;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
`;
