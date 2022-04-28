import styled from 'styled-components';
import colors from 'styles/colors';
import { StyledButtonProps } from './Button';

export const StyledButton = styled.button<StyledButtonProps>`
  margin: ${({ margin }) => margin || '42px'} auto;
  display: block;

  min-width: ${({ minWidth }) => minWidth || '218px'};
  height: 80px;
  padding: 19px 35px;

  background: ${({ bgCol }) => bgCol || colors.brown};
  border-radius: 4px;

  font-weight: 500;
  font-size: 28px;
  font-family: 'Montserrat', sans-serif;

  color: ${colors.white};

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  :disabled {
    cursor: default;
    opacity: 0.8;
  }
`;
