import AbstractDrawer from 'components/AbstractDrawer';
import { AbstractDrawerProps } from 'components/AbstractDrawer/AbstractDrawer';
import React, { FC, memo } from 'react';
import zIndexes from 'styles/z-indexes';

const LeftSideDrawer: FC<AbstractDrawerProps> = ({
  onDrawerClose,
  visible,
  headerTitle = '',
  children = undefined,
  footerChildren = undefined,
}) => {
  return (
    <AbstractDrawer
      size="default"
      placement="left"
      onDrawerClose={onDrawerClose}
      visible={visible}
      headerTitle={headerTitle}
      footerChildren={footerChildren}
      zIndex={zIndexes.leftDrawer}
    >
      {children}
    </AbstractDrawer>
  );
};

export default memo(LeftSideDrawer);
