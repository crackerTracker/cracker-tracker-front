import { Button, Input, InputNumber } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { inputShadow } from 'styles/mixins';

type Props = {
  isDisabled?: boolean;
};

export const InputGroup = styled(Input.Group)<Props>`
  padding: 5px 8px;

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
  max-width: 4vw;

  background-color: ${colors.lightBrown};
  border: 2px solid ${colors.peach};
  border-radius: 4px;

  input {
    text-align: center;
  }

  input:disabled {
    color: ${colors.textBlack};
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  :hover {
    background: ${colors.peach};
  }
`;
