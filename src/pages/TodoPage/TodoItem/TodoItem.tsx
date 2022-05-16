import { List } from 'antd';
import { Space } from 'antd';
import IconButton from 'components/IconButton';
import useDrawer from 'utils/hooks/useDrawer';
import { images } from 'img/icons';
import React, { FC } from 'react';
import useTodo from '../useTodo';
import { StyledCheckbox, ListTodoItem } from './TodoItem.styles';
import TodoRightDrawer from '../TodoRightDrawer';
import { observer } from 'mobx-react-lite';

const TodoItem: FC<{ id: number }> = ({ id }) => {
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const { todoData, deleteTodo, isChecked, checkHandler } = useTodo({
    id,
  });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <TodoRightDrawer
        id={id}
        visible={visible}
        onDrawerClose={onDrawerClose}
      />

      <ListTodoItem onClick={onDrawerOpen} $isChecked={isChecked || false}>
        <List.Item.Meta
          avatar={
            <div onClick={clickHandler}>
              <StyledCheckbox onChange={checkHandler} checked={isChecked} />
            </div>
          }
          title={todoData?.name as string}
        />

        <Space size="large">
          {todoData?.subtodos?.length !== 0 && (
            <IconButton
              image={images.subTodo.default}
              isDisabled={true}
              squareSide="25px"
              paddings="0"
            />
          )}
          <div onClick={clickHandler}>
            <IconButton
              image={images.deletePeach.default}
              squareSide="30px"
              onClick={deleteTodo}
              paddings="0"
            />
          </div>
        </Space>
      </ListTodoItem>
    </>
  );
};

export default observer(TodoItem);
