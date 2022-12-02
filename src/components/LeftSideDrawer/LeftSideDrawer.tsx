import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import React, { FC, memo } from 'react';
import {
  StyledDrawer,
  Date,
  Container,
  Header,
  Content,
  Footer,
} from './LeftSideDrawer.styles';

type LeftSideDrawerProps = {
  onDrawerClose: VoidFunction;
  visible: boolean;
  headerTitle?: string;
  children: JSX.Element;
  footerChildren?: JSX.Element;
};

const LeftSideDrawer: FC<LeftSideDrawerProps> = ({
  onDrawerClose,
  visible,
  headerTitle = '',
  children = undefined,
  footerChildren = undefined,
}) => {
  return (
    <StyledDrawer
      size="default"
      placement="left"
      onClose={onDrawerClose}
      closable={false}
      visible={visible}
    >
      <Container>
        <Header>
          <Date>{headerTitle}</Date>
          <IconButton
            image={images.closeBrown.default}
            onClick={onDrawerClose}
            squareSide="38px"
          />
        </Header>

        <Content>{children}</Content>

        <Footer>{footerChildren}</Footer>
      </Container>
    </StyledDrawer>
  );
};

export default memo(LeftSideDrawer);
