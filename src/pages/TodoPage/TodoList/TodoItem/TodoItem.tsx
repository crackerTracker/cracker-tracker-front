import { List, Space } from 'antd';
import IconButton from 'components/IconButton';
import useDrawer from 'utils/hooks/useDrawer';
import { images } from 'img/icons';
import React, { FC } from 'react';
import useTodo from '../../useTodo';
import { StyledCheckbox, ListTodoItem } from './TodoItem.styles';
import TodoRightDrawer from '../../TodoRightDrawer';
import { observer } from 'mobx-react-lite';

const TodoItem: FC<{ _id: string }> = ({ _id }) => {
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const { todoData, deleteTodoHandler, isChecked, checkHandler } = useTodo({
    _id,
  });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <TodoRightDrawer
        _id={_id}
        visible={visible}
        onDrawerClose={onDrawerClose}
      />

      <ListTodoItem onClick={onDrawerOpen} $isChecked={isChecked}>
        <List.Item.Meta
          avatar={
            <div onClick={clickHandler}>
              <StyledCheckbox onChange={checkHandler} checked={isChecked} />
            </div>
          }
          title={todoData?.name || ''}
        />

        <Space size="large">
          {!!todoData?.subTodos?.length && (
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
              onClick={deleteTodoHandler}
              paddings="0"
            />
          </div>
        </Space>
      </ListTodoItem>
    </>
  );
};

export default observer(TodoItem);
