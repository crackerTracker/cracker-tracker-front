import styled from 'styled-components';
import { DatePicker } from 'antd';

export const StyledDatePicker = styled(DatePicker)<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 0;
  top: 100%;

  .ant-picker-input {
    display: none;
  }
`;
