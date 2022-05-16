import { Checkbox, List } from 'antd';
import styled, { css } from 'styled-components';
import colors, { shadowColors } from 'styles/colors';
import { animate, flex } from 'styles/mixins';

export const ListTodoItem = styled(List.Item)<{ $isChecked: boolean }>`
  margin-bottom: 20px;

  background-color: ${colors.white};
  border-radius: 8px;

  filter: drop-shadow(0px 6px 10px ${shadowColors.sand});
  ${animate('filter')};

  .ant-list-item-meta {
    ${flex({ align: 'center' })}

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

  .ant-checkbox {
    transform: scale(1.8);
    -webkit-transform: scale(1.8);
  }
`;
