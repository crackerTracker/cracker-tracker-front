import { DrawerProps } from 'antd';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import React, { FC, memo } from 'react';
import zIndexes from 'styles/z-indexes';
import {
  StyledAbstractDrawer,
  Title,
  Header,
  Content,
  Footer,
  Container,
} from './AbstractDrawer.styles';

export type AbstractDrawerProps = DrawerProps & {
  visible: boolean;
  onDrawerClose: VoidFunction;
  headerTitle?: string | null;
  footerChildren?: React.ReactNode;
};

const AbstractDrawer: FC<AbstractDrawerProps> = ({
  visible,
  onDrawerClose,
  placement = 'right',
  headerTitle = '',
  children,
  footerChildren,
  zIndex = zIndexes.rightDrawer,
}) => {
  return (
    <StyledAbstractDrawer
      visible={visible}
      onClose={onDrawerClose}
      placement={placement}
      closable={false}
      zIndex={zIndex}
    >
      <Container>
        <Header>
          <Title>{headerTitle}</Title>
          <IconButton
            image={images.closeBrown.default}
            onClick={onDrawerClose}
            squareSide="38px"
          />
        </Header>

        <Content>{children}</Content>

        <Footer>{footerChildren}</Footer>
      </Container>
    </StyledAbstractDrawer>
  );
};

export default memo(AbstractDrawer);
