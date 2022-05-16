import { DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import colors, { halfOpacityColors } from 'styles/colors';

export const StyledDatePicker = styled(DatePicker)<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};

  .ant-picker-input {
    display: none;
  }
`;

export const StyledTextArea = styled(TextArea)`
  padding: 30px 30px 60px;

  font-weight: 400;
  font-size: 19px;
  color: ${colors.textBlack};

  border-radius: 8px;
  background-color: ${halfOpacityColors.lightBrown};

  ::placeholder {
    color: ${halfOpacityColors.brown};
  }

  :hover {
    background-color: ${halfOpacityColors.lightBrown};
  }

  :focus {
    background-color: ${colors.lightBrown};
  }
`;
