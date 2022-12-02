import styled from 'styled-components';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import colors, { halfOpacityColors, shadowColors } from 'styles/colors';
import { flex, animate, textElipsisOverflow } from 'styles/mixins';
import IconButton from 'components/IconButton';

export const GroupsWrapper = styled.div`
  margin-bottom: 20px;
  ${flex({ direction: 'column' })};
`;

export const GroupsHeader = styled.div`
  margin-bottom: 10px;
  margin-left: 12px;

  font-size: 19px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
`;

export const ContentBlock = styled.div`
  padding: 26px 12px 10px 12px;

  border-radius: 8px;
  background-color: ${halfOpacityColors.lightBrown};
`;

export const GroupItemWrapper = styled(Link)`
  margin-bottom: 10px;
  padding: 7px 14px;

  ${flex({ align: 'center', justify: 'space-between' })};

  border-radius: 4px;
  background-color: ${colors.lightBrown};

  box-shadow: 0px 6px 20px ${shadowColors.borderSand};
  transform: translate3d(0px, 0px, 0px);
  cursor: pointer;

  ${animate('transform', 'box-shadow')};

  :hover {
    box-shadow: 0px 6px 20px ${shadowColors.brown};
    transform: translate3d(0px, -2px, 0px);
  }
`;

export const GroupItem = styled.span`
  font-size: 16px;
  color: ${colors.textBlack};
  ${textElipsisOverflow};
`;

export const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
`;

export const InputGroup = styled(Input.Group)`
  ${flex({ align: 'center' })}
`;

export const StyledInput = styled(Input)`
  padding: 6px 8px;
  margin-left: 10px;

  font-weight: 400;
  font-size: 16px;
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
