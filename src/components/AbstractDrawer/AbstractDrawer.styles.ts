import { Drawer } from 'antd';
import styled, { css } from 'styled-components';
import colors from 'styles/colors';
import { navbarWidth } from 'styles/consts';
import { flex, scroller } from 'styles/mixins';

export const StyledAbstractDrawer = styled(Drawer)`
  z-index: ${({ zIndex }) => zIndex};

  .ant-drawer-body {
    background-color: ${colors.peach};
  }

  .ant-drawer-content-wrapper {
    ${({ placement, visible }) =>
      placement === 'left' &&
      css`
        transform: ${visible
          ? `translate3d(${navbarWidth}, 0, 0)`
          : `translate3d(calc(-100% - ${navbarWidth}), 0, 0)`};
      `}
  }
`;

export const Container = styled.div`
  // 48px - vertical paddings
  height: calc(100vh - 48px);
  ${flex({ direction: 'column' })}
`;

export const Header = styled.header`
  ${flex({ align: 'center' })}
  margin-bottom: 35px;
`;

export const Title = styled.div`
  ${flex({ align: 'center', justify: 'center' })}
  flex: 1 1 auto;

  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 19px;
  color: ${colors.darkBrown};
`;

export const Content = styled.div`
  ${flex({ direction: 'column' })}
  flex: 1 1 auto;

  font-size: 19px;
  color: ${colors.textBlack};

  ${scroller}
  overflow: auto;
`;

export const Footer = styled.footer`
  padding-top: 30px;
`;
