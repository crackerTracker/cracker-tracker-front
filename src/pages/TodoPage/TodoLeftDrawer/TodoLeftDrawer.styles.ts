import styled from 'styled-components';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { animate, square } from 'styles/mixins';
import colors, { shadowColors } from 'styles/colors';

export const StyledLink = styled(Link)`
  padding: 12px;
  background-color: ${colors.lightBrown};
  border-radius: 4px;
  box-shadow: 0 6px 20px ${shadowColors.brown};
  ${animate('box-shadow')};

  :hover {
    box-shadow: 0 6px 20px rgba(208, 147, 106, 0.35);
  }
`;

export const LinkText = styled.span`
  color: ${colors.textBlack};
  font-size: 19px;
  font-family: 'Montserrat', sans-serif;
`;

export const Image = styled.img`
  ${square('28px')}
  margin-right: 18px;
`;

export const StyledDivider = styled(Divider).attrs({
  type: 'horizontal',
})`
  margin: 35px 0;
  background-color: ${colors.grayishBlue};
  opacity: 0.5;
  flex-shrink: 0;
`;
