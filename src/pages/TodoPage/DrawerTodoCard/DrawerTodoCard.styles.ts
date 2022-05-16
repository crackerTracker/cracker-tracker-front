import styled, { css } from 'styled-components';
import colors, { halfOpacityColors, shadowColors } from 'styles/colors';
import { flex } from 'styles/mixins';
import { Card, Checkbox, Input } from 'antd';

export const StyledCard = styled(Card)`
  margin-bottom: 24px;

  border-radius: 8px;
  background-color: ${halfOpacityColors.lightBrown};
  filter: drop-shadow(0px 6px 20px ${shadowColors.brown});

  .ant-card-head {
    background-color: ${colors.lightBrown};
    border-radius: 8px;
    border: none;
  }

  .ant-card-head-title .ant-input {
    font-weight: 700;
    font-size: 28px;
    color: ${colors.black};
  }

  .ant-list-split .ant-list-item {
    border-bottom: none;
  }

  .ant-list-item:last-child {
    margin-bottom: 8px;
  }
`;

export const StyledCheckbox = styled(Checkbox)<{ checked: boolean }>`
  margin-left: 6px;
  ${flex({ align: 'center' })}

  .ant-checkbox {
    transform: scale(1.7);
    -webkit-transform: scale(1.7);
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

  ${({ checked }) =>
    css`
      opacity: ${checked ? '0.5' : '1'};
      input {
        text-decoration: ${checked ? 'line-through' : 'none'};
      }
    `}
`;

export const InputGroup = styled(Input.Group)`
  ${flex({ align: 'center' })}
`;

export const StyledInput = styled(Input)`
  padding: 8px 10px;
  margin-left: 10px;

  font-weight: 400;
  font-size: 23px;
  color: ${colors.textBlack};

  background-color: transparent;

  :hover,
  :focus {
    background-color: ${colors.lightBrown};
  }

  ::placeholder {
    color: ${halfOpacityColors.brown};
  }
`;
