import { Checkbox, Drawer, List } from 'antd';
import { ListItemTypeProps } from 'antd/lib/list/Item';
import styled, { css } from 'styled-components';
import colors, { shadowColors } from 'styles/colors';
import { animate, flex, square } from 'styles/mixins';

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    background-color: ${colors.peach};
  }
`;

export const ListItem = styled(List.Item)<{
  $isChecked: boolean;
  props?: ListItemTypeProps;
}>`
  margin-bottom: 20px;

  background-color: ${colors.white};
  border-radius: 8px;

  filter: drop-shadow(0px 6px 10px ${shadowColors.sand});
  ${animate('filter')};

  .ant-list-item-meta {
    ${flex({ align: 'center' })}
    .ant-list-item-meta-avatar {
      ${flex({ align: 'center' })}
    }
    h4 {
      margin-bottom: 0;

      font-weight: 400;
      font-size: 25px;
    }
  }

  :hover {
    cursor: pointer;
    filter: drop-shadow(0px 6px 10px ${shadowColors.borderSand});
    ${animate('filter')};
  }

  ${({ $isChecked }) =>
    css`
      opacity: ${$isChecked ? '0.5' : '1'};
      text-decoration: ${$isChecked ? 'line-through' : 'none'};
    `}
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 26px;
  margin-left: 10px;

  span {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
  }
`;

export const Icon = styled.div<{ image: string; squareSide?: string }>`
  ${({ squareSide }) =>
    css`
      ${square(squareSide ? squareSide : '22px')};
    `}

  ${({ image }) =>
    css`
      background: url(${image}) no-repeat center/contain;
    `}
`;
