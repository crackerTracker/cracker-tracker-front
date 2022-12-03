import styled from 'styled-components';
import colors from 'styles/colors';
import { DatePicker } from 'antd';

export const Relative = styled.div`
  position: relative;
`;

export const DatesTitle = styled.div`
  color: ${colors.brown};
`;

export const StyledDatePicker = styled(DatePicker)<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 0;
  top: 100%;

  .ant-picker-input {
    display: none;
  }
`;
