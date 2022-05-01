import { Button, Input, InputNumber, TimePicker } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { inputShadow } from 'styles/mixins';

export const InputGroup = styled(Input.Group)<{ isDisabled?: boolean }>`
  padding: 5px 8px 5px 0;

  color: ${colors.textBlack};

  border-radius: 4px;
  background-color: ${({ isDisabled }) =>
    isDisabled ? colors.lightBrown : colors.white};
  ${inputShadow};

  .ant-row {
    display: flex;
  }
`;

export const StyledInput = styled(Input)`
  :disabled {
    color: ${colors.textBlack};
    cursor: default;
  }
  :focus::placeholder {
    color: transparent;
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  background-color: transparent;

  input {
    text-align: center;
  }

  input:disabled {
    text-align: right;
    color: ${colors.brown};
    cursor: default;
  }
`;

export const StyledText = styled.span`
  line-height: 30px;
  color: ${colors.brown};
`;

export const StyledTimeRange = styled.div`
  .ant-picker {
    .ant-picker-input .ant-picker-suffix {
      display: none;
    }
    :last-of-type .ant-picker-input .ant-picker-suffix {
      display: flex;
    }
  }
  .ant-picker.ant-picker-disabled {
    cursor: default;
  }
`;

export const StyledTimePicker = styled(TimePicker)`
  input {
    width: 2.5vw;
    text-align: center;
  }
  input:disabled,
  svg {
    color: ${colors.brown};
    cursor: default;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  :hover {
    background: ${colors.peach};
  }
`;
