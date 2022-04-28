import { Button, Input, InputNumber, TimePicker } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { inputShadow } from 'styles/mixins';

type Props = {
  isDisabled?: boolean;
};

export const InputGroup = styled(Input.Group)<Props>`
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
  }
`;

export const StyledText = styled.span`
  line-height: 30px;
  color: ${colors.brown};
`;

export const StyledTimeRange = styled.div`
  // removing first clock svg
  .ant-picker {
    .ant-picker-input .ant-picker-suffix {
      display: none;
    }
    :last-of-type .ant-picker-input .ant-picker-suffix {
      display: flex;
    }
  }
`;

export const StyledTimePicker = styled(TimePicker)`
  div:last-child span {
  }
  input {
    width: 2.5vw;
    text-align: center;
  }
  input:disabled,
  svg {
    color: ${colors.brown};
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  :hover {
    background: ${colors.peach};
  }
`;
