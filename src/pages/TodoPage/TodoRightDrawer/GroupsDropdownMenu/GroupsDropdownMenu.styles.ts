import styled, { css } from 'styled-components';
import { Input, Menu } from 'antd';
import colors, { halfOpacityColors } from 'styles/colors';
import { flex, scroller, text, textElipsisOverflow } from 'styles/mixins';

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

export const GroupsWrapper = styled.div`
  margin: 5px 5px 5px 0;

  max-width: 400px;
  max-height: 270px;

  overflow-y: auto;
  ${scroller};
`;

export const GroupMenuItem = styled(Menu.Item)`
  ${text};
  line-height: 1.5;

  // .ant-dropdown-menu-title-content
  & > span {
    ${flex({ align: 'center', justify: 'space-between' })};
    overflow: hidden;
  }
`;

export const GroupName = styled.span<{ isSelected: boolean }>`
  ${textElipsisOverflow};

  ${({ isSelected }) =>
    isSelected &&
    css`
      margin-right: 10px;
      cursor: default;
    `};
`;

export const NoGroupsMessage = styled.div`
  padding: 10px 12px;

  font-size: 19px;
  color: ${halfOpacityColors.brown};
  text-align: center;

  user-select: none;
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

  color: ${colors.textBlack};

  :focus {
    box-shadow: none;
    background-color: ${colors.lightBrown};
  }

  ::placeholder {
    color: ${halfOpacityColors.brown};
  }
`;
