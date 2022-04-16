import styled from 'styled-components';
import colors from 'styles/colors';

type StyledButtonProps = {
  margin?: string;
};

export const StyledButton = styled.button<StyledButtonProps>`
  margin: ${({ margin }) => margin || '42px'} auto;
  display: block;

  min-width: 218px;
  height: 80px;
  padding: 19px 35px;

  background: ${colors.brown};
  border-radius: 4px;

  font-weight: 500;
  font-size: 28px;

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
