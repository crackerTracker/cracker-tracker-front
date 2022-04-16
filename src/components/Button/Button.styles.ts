import styled from 'styled-components';
import colors from 'styles/colors';

type StyledButtonProps = {
  margin?: string;
};

export const StyledButton = styled.div<StyledButtonProps>`
  margin: ${({ margin }) => margin || '42px'} 0;
  text-align: center;

  button {
    min-width: 218px;
    padding: 27px 35px;

    background: ${colors.brown};
    border-radius: 4px;

    font-weight: 500;
    font-size: 28px;
    line-height: 26px;

    font-family: inherit;
    color: ${colors.white};

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }

    :disabled {
      cursor: default;
      opacity: 0.8;
    }
  }
`;
