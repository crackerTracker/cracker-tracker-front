import React from 'react';
import { Buttons, Container, Logo } from './NavSidebar.styles';
import IconButton from 'components/IconButton';
import colors from 'styles/colors';

const NavSidebar = () => {
  return (
    <Container>
      <Logo />

      <Buttons>
        <IconButton backgroundColor={colors.darkBrown} />
        <IconButton backgroundColor={colors.darkBrown} />
        <IconButton backgroundColor={colors.darkBrown} />
      </Buttons>
    </Container>
  );
};

export default NavSidebar;
