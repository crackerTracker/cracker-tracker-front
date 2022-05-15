import styled from 'styled-components';
import colors from 'styles/colors';
import { backgroundImageContain, flex, scroller, square } from 'styles/mixins';
import { images } from 'img/common';
import { Divider } from 'antd';

export const MainPart = styled.div`
  ${flex({ direction: 'column', align: 'center' })}
`;

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;

  background-color: ${colors.peach};

  padding: 45px 15px 110px;

  ${flex({ direction: 'column', align: 'center' })};
`;

export const Logo = styled.div`
  ${square('65px')};
  ${backgroundImageContain(images.logo)};
  margin-bottom: 60px;
`;

export const Buttons = styled.div`
  ${flex({ direction: 'column', justify: 'space-between' })};

  & > * {
    margin-bottom: 30px;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const StyledDivider = styled(Divider).attrs({
  type: 'horizontal',
})`
  margin: 50px 0;
  background-color: ${colors.grayishBlue};
  opacity: 0.5;
`;

export const ScrollContainer = styled.div`
  max-height: 100%;
  overflow: auto;
  ${scroller};
`;

export const ExtraButtons = styled.div`
  ${flex({ direction: 'column', justify: 'space-between' })};
  gap: 30px;
`;
