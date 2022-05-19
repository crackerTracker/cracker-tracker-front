import styled from 'styled-components';
import colors, { halfOpacityColors, shadowColors } from 'styles/colors';
import { flex, scroller } from 'styles/mixins';
import { Input, List } from 'antd';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: ${colors.lightBrown};
`;

export const Container = styled.div`
  width: 80vw;
  height: 100%;

  margin: 0 auto;
  padding: 8vh 0;

  ${flex({ direction: 'column' })}
`;

export const Header = styled.header``;

export const TextBlock = styled.div`
  font-family: 'Montserrat';
`;

export const Title = styled.h1`
  margin-right: 20px;
  margin-bottom: 0;

  font-family: inherit;
  font-weight: 600;
  font-size: 50px;
  line-height: 61px;

  // deleting space on the left
  ::first-letter {
    margin-left: -0.1em;
  }
`;

export const TitleGroup = styled.div`
  margin-bottom: 18px;
  ${flex({})}

  font-family: inherit;
`;

export const SubTitle = styled.h2`
  margin-bottom: 0;

  font-family: inherit;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.textBlack};
`;

export const Toggle = styled.div`
  margin-top: 0.5em;
  ${flex({ align: 'center' })}
`;

export const Todos = styled.div`
  margin-top: 45px;
  margin-bottom: 22px;

  ${flex({ direction: 'column' })}
  flex: 1 1 auto;

  overflow: auto;
  ${scroller}
`;

export const StyledList = styled(List)`
  border: none;

  .ant-list-item {
    border: 1px solid ${shadowColors.borderSand};
  }
`;

export const InputContainer = styled.div`
  padding: 25px 35px;
  ${flex({})}

  border-radius: 16px;
  background-color: ${colors.sand};
  filter: drop-shadow(0px 6px 20px ${shadowColors.brown});
`;

export const StyledInput = styled(Input)`
  margin-right: 35px;
  padding-top: 22px;
  padding-bottom: 22px;

  font-size: 19px;
  line-height: 26px;

  border: none;
  background-color: ${halfOpacityColors.lightBrown};
  border-radius: 6px;

  :focus {
    box-shadow: none;
    background-color: ${colors.lightBrown};
  }

  ::placeholder {
    color: ${halfOpacityColors.brown};
  }
`;
