import styled from 'styled-components';
import colors from 'styles/colors';
import { backgroundImageContain, flex, square } from 'styles/mixins';
import { images } from 'img/common';

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;

  background-color: ${colors.peach};

  padding: 45px 15px;

  ${flex({ direction: 'column', align: 'center' })};
`;

export const Logo = styled.div`
  ${square('65px')};
  ${backgroundImageContain(images.logo)};
  margin-bottom: 60px;
`;

export const Buttons = styled.div`
  height: 200px;

  ${flex({ direction: 'column', justify: 'space-between' })};
`;
