import { Checkbox, DatePicker, List } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled, { css } from 'styled-components';
import colors, { halfOpacityColors, shadowColors } from 'styles/colors';
import { animate, flex, square } from 'styles/mixins';

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
