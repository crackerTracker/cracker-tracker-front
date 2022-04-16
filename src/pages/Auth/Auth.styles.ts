import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, square, text } from 'styles/mixins';

export const Wrapper = styled.div`
  margin: 0 auto;
  background: ${colors.lightBrown};
  font-family: 'Montserrat', sans-serif;

  * {
    font-family: inherit;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 85vw;
  height: 100vh;

  ${flex({ justify: 'space-around', align: 'center' })}

  column-gap: 50px;
`;

export const TextContent = styled.div`
  max-width: 590px;
  min-height: 85vh;

  user-select: none;

  ${flex({ direction: 'column', align: 'center' })}
`;

export const Logo = styled.div`
  ${flex({ direction: 'column', align: 'center' })}

  img {
    ${square('200px')}
    margin-bottom: 11px;
    text-align: center;
  }

  div {
    font-weight: 600;
    font-size: 42px;
    line-height: 59px;

    color: ${colors.textBlack};
  }
`;

export const Motto = styled.div`
  font-weight: 700;
  font-size: 136px;
  line-height: 152px;

  text-align: center;
  text-transform: uppercase;

  opacity: 0.3;
`;

export const AuthForm = styled.div`
  max-width: 710px;
  max-height: 500px;
  ${flex({ direction: 'column', align: 'center' })}
  padding: 30px 48px;

  background: ${colors.white};
  box-shadow: 0px 0px 20px 1px rgba(174, 102, 54, 0.15);
  border-radius: 8px;
  color: ${colors.textBlack};
`;

export const Title = styled.div`
  margin-bottom: 25px;

  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
`;

export const ChangeForm = styled.div`
  font-weight: 500;
  ${text}
  text-align: center;
  opacity: 0.5;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const UserData = styled.div`
  max-width: 614px;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 6px;

  font-weight: 500;
  ${text}
  opacity: 0.6;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  margin-bottom: 25px;
  padding: 0 12px;

  box-shadow: 0px 1px 4px rgba(56, 56, 56, 0.1);
  border-radius: 8px;
  border: 1px solid ${colors.peach};

  :last-of-type {
    margin-bottom: 0;
  }

  :focus {
    outline: 1px solid ${colors.brown};
  }
`;
