import React, { FC, memo } from 'react';
import AbstractDrawer, { AbstractDrawerProps } from 'components/AbstractDrawer';
import zIndexes from 'styles/z-indexes';

type LeftSideDrawerProps = Pick<
  AbstractDrawerProps,
  'children' | 'footerChildren' | 'headerTitle' | 'onDrawerClose' | 'visible'
>;

const LeftSideDrawer: FC<LeftSideDrawerProps> = ({
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
