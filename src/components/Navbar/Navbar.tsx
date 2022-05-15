import React from 'react';
import {
  Buttons,
  Container,
  ExtraButtonWrapper,
  Logo,
  MainButtonWrapper,
  MainPart,
  ScrollContainer,
  StyledDivider,
} from './Navbar.styles';
import IconButton from 'components/IconButton';
import colors from 'styles/colors';
import { useNavbarStore } from 'stores/hooks';
import useInitNavbar from 'components/Navbar/useInitNavbar';
import { observer } from 'mobx-react-lite';
import useObserveURL from './useObserveURL';

const Navbar = () => {
  useInitNavbar();
  useObserveURL();

  const { routesButtons, sectionButtons, activeRoute, activeSection } =
    useNavbarStore();

  return (
    <Container>
      <MainPart>
        <Logo />

        <Buttons>
          {routesButtons &&
            routesButtons.map(({ route, image, callback }) => (
              <MainButtonWrapper key={route} active={route === activeRoute}>
                <IconButton
                  backgroundColor={colors.darkBrown}
                  hoverColor={colors.darkBrown}
                  image={image}
                  onClick={callback}
                />
              </MainButtonWrapper>
            ))}
        </Buttons>
      </MainPart>

      {sectionButtons && (
        <>
          <StyledDivider />

          <ScrollContainer>
            <Buttons>
              {sectionButtons.map(({ section, image, callback }) => (
                <ExtraButtonWrapper
                  key={section}
                  active={section === activeSection}
                >
                  <IconButton
                    image={image}
                    onClick={callback}
                    hoverColor={'transparent'}
                  />
                </ExtraButtonWrapper>
              ))}
            </Buttons>
          </ScrollContainer>
        </>
      )}
    </Container>
  );
};

export default observer(Navbar);
