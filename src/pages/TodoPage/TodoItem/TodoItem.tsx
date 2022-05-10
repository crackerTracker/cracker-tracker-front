import { List } from 'antd';
import { message, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import IconButton from 'components/IconButton/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import useDrawer from 'components/RightSideDrawer/useDrawer';
import { images } from 'img/icons';
import React, { FC, useState } from 'react';
import { Icon, StyledCheckbox, ListItem } from './TodoItem.styles';

interface TodoItemProps {
  item?: string;
  onClick?: VoidFunction;
  check?: boolean;
}

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { visible, setVisible, onDrawerClose } = useDrawer();

  const todoItemClick = () => {
    setVisible(true);
  };

  const checkHandler = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const deleteTodoHandler = () => {
    message.success('Удалено');
  };

  return (
    <>
      <RightSideDrawer
        onDrawerClose={onDrawerClose}
        visible={visible}
        headerDate={`Выполнить до 23.02.22`}
        footerChildren={
          <IconButton image={images.deleteBrown.default} squareSide="55px" />
        }
      >
        <div>some content</div>
      </RightSideDrawer>

      <ListItem onClick={todoItemClick} $isChecked={isChecked}>
        <List.Item.Meta
          avatar={
            <div onClick={clickHandler}>
              <StyledCheckbox onChange={checkHandler} />
            </div>
          }
          title={item as string}
        />

        <Space size="large">
          <Icon image={images.subTodo.default} />
          <div onClick={clickHandler}>
            <IconButton
              image={images.deletePeach.default}
              squareSide="45px"
              onClick={deleteTodoHandler}
            />
          </div>
        </Space>
      </ListItem>
    </>
  );
};

export default TodoItem;
