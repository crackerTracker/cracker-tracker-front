import styled, { css } from 'styled-components';
import colors, { halfOpacityColors } from 'styles/colors';
import { List } from 'antd';

export const SmallTodoListItem = styled(List.Item)<{ $isChecked: boolean }>`
  padding: 8px;
  column-gap: 5px;

  border-radius: 6px;
  cursor: pointer;

  :hover {
    background-color: ${halfOpacityColors.lightBlue};
  }

  .ant-list-item-meta {
    align-items: center;

    h4 {
      margin-bottom: 0;
    }
  }

  ${({ $isChecked }) =>
    css`
      opacity: ${$isChecked ? '0.5' : '1'};
      text-decoration: ${$isChecked ? 'line-through' : 'none'};
    `}
`;

export const TodoName = styled.div`
  font-weight: 400;
  font-size: 19px;
  color: ${colors.textBlack};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
