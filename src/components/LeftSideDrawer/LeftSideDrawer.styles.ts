import { Drawer, DrawerProps } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, scroller } from 'styles/mixins';
import zIndexes from 'styles/z-indexes';

const leftSidebarWidth = '95px';

export const StyledDrawer: React.FC<DrawerProps> = styled(Drawer)`
  z-index: ${zIndexes.leftDrawer};

  .ant-drawer-content-wrapper {
    transform: ${({ visible }) =>
      visible
        ? `translateX(${leftSidebarWidth})`
        : `translateX(calc(-100% - ${leftSidebarWidth}))`};
  }

  .ant-drawer-body {
    background-color: ${colors.peach};
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

export const Date = styled.div`
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
