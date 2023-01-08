import React, { FC, memo } from 'react';
import AbstractDrawer, { AbstractDrawerProps } from 'components/AbstractDrawer';

type RightSideDrawerProps = Pick<
  AbstractDrawerProps,
  'children' | 'footerChildren' | 'headerTitle' | 'onDrawerClose' | 'visible'
>;

const RightSideDrawer: FC<RightSideDrawerProps> = ({
  onDrawerClose,
  visible,
  headerTitle = '',
  children = undefined,
  footerChildren = undefined,
}) => {
  return (
    <AbstractDrawer
      width={572}
      placement="right"
      onDrawerClose={onDrawerClose}
      visible={visible}
      headerTitle={headerTitle}
      footerChildren={footerChildren}
    >
      {children}
    </AbstractDrawer>
  );
};

export default memo(RightSideDrawer);
