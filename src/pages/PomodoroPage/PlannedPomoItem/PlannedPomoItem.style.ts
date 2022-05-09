import { Button, Input, InputNumber } from 'antd';
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

export const StyledInputNumber = styled(InputNumber)`
  background-color: transparent;
  border-right: 1px solid ${colors.brown};
  max-width: 4vw;

  :hover {
    border-right: 1px solid ${colors.brown};
    transition: none;
  }

  input {
    text-align: center;
  }

  input:disabled {
    color: ${colors.textBlack};
    cursor: default;
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

export const StyledButton = styled(Button)`
  border-radius: 4px;
  :hover {
    background: ${colors.peach};
  }
`;
