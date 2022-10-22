import IconButton from 'components/IconButton/IconButton';
import { images } from 'img/icons';
import React, { FC } from 'react';
import {
  StyledDrawer,
  Date,
  Header,
  Content,
  Footer,
  Container,
} from './RightSideDrawer.styles';

export interface RightSideDrawerProps {
  children?: React.ReactNode;
  footerChildren?: React.ReactNode;
  onDrawerClose: VoidFunction;
  visible: boolean;
  headerTitle?: string | null;
}

const RightSideDrawer: FC<RightSideDrawerProps> = ({
  onDrawerClose,
  visible,
  headerTitle = '',
  children = undefined,
  footerChildren = undefined,
}) => {
  return (
    <StyledDrawer
      width={572}
      placement="right"
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

export default RightSideDrawer;
