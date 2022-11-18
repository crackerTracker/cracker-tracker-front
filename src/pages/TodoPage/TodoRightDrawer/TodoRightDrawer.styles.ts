import styled from 'styled-components';
import { DatePicker, Menu } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import IconButton from 'components/IconButton';
import colors, { halfOpacityColors } from 'styles/colors';
import { text } from 'styles/mixins';

export const StyledDatePicker = styled(DatePicker)<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};

  .ant-picker-input {
    display: none;
  }
`;

export const StyledIconButton = styled(IconButton)<{ margin?: string }>`
  margin: ${({ margin }) => margin || '0 10px 0 0'};
`;

export const GroupMenu = styled(Menu)`
  padding-bottom: 8px;
  border: 2px solid ${colors.peach};
  background-color: ${colors.lightBrown};
`;

export const GroupMenuHeader = styled.div`
  min-width: 300px;
  padding: 8px 22px;
  margin-top: -4px;

  font-size: 22px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  color: ${colors.textBlack};

  background-color: ${colors.peach};
`;

export const GroupMenuItem = styled(Menu.Item)`
  ${text};
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
