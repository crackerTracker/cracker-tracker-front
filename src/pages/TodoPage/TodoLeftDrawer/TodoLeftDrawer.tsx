import React, { FC, memo } from 'react';
import LeftSideDrawer from 'components/LeftSideDrawer';
import GroupsMenu from '../GroupsMenu';

type TodoLeftDrawerProps = {
  visible: boolean;
  onDrawerClose: VoidFunction;
};

const TodoLeftDrawer: FC<TodoLeftDrawerProps> = ({
  visible,
  onDrawerClose,
}) => {
  return (
    <LeftSideDrawer visible={visible} onDrawerClose={onDrawerClose}>
      <GroupsMenu />
    </LeftSideDrawer>
  );
};

export default memo(TodoLeftDrawer);
