import styled from 'styled-components';
import colors from 'styles/colors';
import { animate, inputShadow } from 'styles/mixins';
import { Input } from 'antd';

export const Panel = styled.div`
  padding: 26px 30px;
  border-radius: 8px;
  background-color: ${colors.white};
  ${inputShadow};

  display: inline-block;
`;

export const StyledInput = styled(Input).attrs({ size: 'large' })`
  width: 250px;

  ::placeholder {
    color: ${colors.peach};
  }
`;

export const DateDisplay = styled.div`
  width: 150px;
  border: 1px solid ${colors.peach};
  border-radius: 4px;

  overflow: hidden;

  display: flex;

  ${animate('opacity')};

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const Date = styled.div`
  font-size: 15px;
  color: ${colors.brown};

  flex-grow: 1;

  // todo flex
  display: flex;
  justify-content: center;
  align-items: center;
`;
