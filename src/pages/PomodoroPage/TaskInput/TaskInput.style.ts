import { Button, Input, InputNumber } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { inputShadow } from 'styles/mixins';

export const InputGroup = styled(Input.Group)<{ isDisabled?: boolean }>`
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

export const StyledInputNumber = styled(InputNumber)<{ isEdit?: boolean }>`
  max-width: 4vw;

  background-color: ${colors.lightBrown};
  border: 2px solid ${colors.peach};
  border-radius: 4px;
  color: inherit;

  input {
    text-align: center;
    opacity: ${({ isEdit }) => (isEdit ? 1 : 0.7)};
  }
`;

export const StyledInput = styled(Input)<{ isEdit?: boolean }>`
  color: inherit;
  opacity: ${({ isEdit }) => (isEdit ? 1 : 0.7)};
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  :hover {
    background: ${colors.peach};
  }
`;
