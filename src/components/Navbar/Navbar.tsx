import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Buttons,
  Container,
  ExtraButtonWrapper,
  Logo,
  MainButtonWrapper,
  MainPart,
  ScrollContainer,
  SettingsButton,
  StyledDivider,
} from './Navbar.styles';
import IconButton from 'components/IconButton';
import colors from 'styles/colors';
import { useNavbarStore } from 'stores/hooks';
import useInitNavbar from 'components/Navbar/useInitNavbar';
import useObserveURL from './useObserveURL';
import { images } from 'img/icons';
import { Dropdown } from 'antd';
import useSettingsButton from './useSettingsButton';

const Navbar = () => {
  useInitNavbar();
  useObserveURL();

  const { routesButtons, sectionButtons, activeRoute, activeSection } =
    useNavbarStore();

  const { settingButtonMenu } = useSettingsButton();

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
                  active={section === activeSection} // todo incorrect now
                >
                  <IconButton
                    image={image}
                    onClick={callback}
                    hoverColor="transparent"
                  />
                </ExtraButtonWrapper>
              ))}
            </Buttons>
          </ScrollContainer>
        </>
      )}

      <Dropdown overlay={settingButtonMenu} trigger={['click']}>
        <SettingsButton image={images.settingsGrayishBlue.default} />
      </Dropdown>
    </Container>
  );
};

export default observer(Navbar);
