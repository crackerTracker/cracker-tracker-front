import React from 'react';
import {
  Buttons,
  Container,
  ExtraButtons,
  Logo,
  MainPart,
  ScrollContainer,
  StyledDivider,
} from './Navbar.styles';
import IconButton from 'components/IconButton';
import colors from 'styles/colors';
import { useNavbarStore } from 'stores/hooks';
import useInitNavbar from 'utils/hooks/useInitNavbar';
import { observer } from 'mobx-react-lite';

const Navbar = () => {
  useInitNavbar();

  const { routesButtons, sectionButtons } = useNavbarStore();

  return (
    <Container>
      <MainPart>
        <Logo />

        <Buttons>
          {routesButtons &&
            routesButtons.map(({ route, image, callback }) => (
              <IconButton
                key={route}
                backgroundColor={colors.darkBrown}
                image={image}
                onClick={callback}
              />
            ))}
        </Buttons>
      </MainPart>

      {sectionButtons && (
        <>
          <StyledDivider />

          <ScrollContainer>
            <ExtraButtons>
              {sectionButtons.map(({ section, image, callback }) => (
                <IconButton key={section} image={image} onClick={callback} />
              ))}
            </ExtraButtons>
          </ScrollContainer>
        </>
      )}
    </Container>
  );
};

export default observer(Navbar);
