import styled from 'styled-components';
import { Input, Menu } from 'antd';
import colors, { halfOpacityColors } from 'styles/colors';
import { flex, text } from 'styles/mixins';

export const GroupMenu = styled(Menu)`
  padding-bottom: 8px;
  border: 2px solid ${colors.peach};
  background-color: ${colors.lightBrown};
`;

export const GroupMenuHeader = styled.li`
  min-width: 300px;
  min-height: 50px;
  padding: 8px 22px;
  margin-top: -4px;

  font-size: 22px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
  color: ${colors.textBlack};

  background-color: ${colors.peach};
`;

export const GroupMenuItem = styled(Menu.Item)`
  ${text};
  line-height: 1.5;
`;

export const GroupMenuFooter = styled(Input.Group)`
  ${flex({ align: 'center' })};
  padding: 0 12px;
`;

export const StyledInput = styled(Input)`
  font-size: 19px;

  border: none;
  background-color: ${halfOpacityColors.lightBrown};
  border-radius: 6px;

  :focus {
    box-shadow: none;
    background-color: ${colors.lightBrown};
  }

  ::placeholder {
    color: ${halfOpacityColors.brown};
  }
`;
