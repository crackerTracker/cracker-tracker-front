import React, { FC, memo } from 'react';
import LeftSideDrawer from 'components/LeftSideDrawer';
import GroupsMenu from '../GroupsMenu';
import { MainRoutesEnum } from 'config/routes';
import { images } from 'img/icons';
import {
  StyledLink,
  LinkText,
  StyledDivider,
  Image,
} from './TodoLeftDrawer.styles';

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
      <StyledLink to={`/${MainRoutesEnum.todo}/`} onClick={onDrawerClose}>
        <Image src={images.todolistBrown.default} alt="back to all todos" />
        <LinkText>Все задачи</LinkText>
      </StyledLink>

      <StyledDivider />

      <GroupsMenu />
    </LeftSideDrawer>
  );
};

export default memo(TodoLeftDrawer);
