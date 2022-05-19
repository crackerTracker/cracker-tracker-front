import styled, { css } from 'styled-components';
import colors, { halfOpacityColors } from 'styles/colors';
import { flex } from 'styles/mixins';
import { Checkbox, Input, List } from 'antd';

export const SubtodoListItem = styled(List.Item)`
  border-radius: 4px;
  padding: 6px 8px;

  :hover {
    background-color: ${halfOpacityColors.lightBlue};
  }
`;

export const StyledCheckbox = styled(Checkbox)<{ $isChecked: boolean }>`
  width: 100%;
  ${flex({ align: 'center' })}

  .ant-checkbox {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
  }

  span:last-child {
    flex: 1 1 auto;
  }

  input {
    background-color: transparent;
    :focus {
      text-decoration: none;
    }
  }

  ${({ $isChecked }) =>
    css`
      opacity: ${$isChecked ? '0.5' : '1'};
      input {
        text-decoration: ${$isChecked ? 'line-through' : 'none'};
      }
    `}
`;

export const StyledInput = styled(Input)`
  font-weight: 400;
  font-size: 23px;
  color: ${colors.textBlack};
`;
