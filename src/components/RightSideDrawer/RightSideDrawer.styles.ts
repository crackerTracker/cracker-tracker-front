import { Drawer } from 'antd';
import styled from 'styled-components';
import colors from 'styles/colors';
import { flex, scroller } from 'styles/mixins';

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    background-color: ${colors.peach};
  }
`;

export const Container = styled.div`
  height: calc(100vh - 48px);
  ${flex({ direction: 'column' })}
`;

export const Header = styled.header`
  ${flex({})}
  margin-bottom: 35px;
`;

export const Date = styled.div`
  ${flex({ align: 'center', justify: 'center' })}
  flex: 1 1 auto;

  font-family: 'Montserrat';
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

export const Footer = styled.footer``;
