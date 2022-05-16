import { List } from 'antd';
import Checkbox from 'antd/lib/checkbox';
import useDrawer from 'utils/hooks/useDrawer';
import { images } from 'img/icons';
import { observer } from 'mobx-react-lite';
import TodoRightDrawer from 'pages/TodoPage/TodoRightDrawer';
import useTodo from 'pages/TodoPage/useTodo';
import React, { FC } from 'react';
import { SmallTodoListItem, TodoName } from './SmallTodoItem.styles';
import IconButton from 'components/IconButton';

const SmallTodoItem: FC<{ id: number }> = ({ id }) => {
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const { todoData, isChecked, checkHandler } = useTodo({ id });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <SmallTodoListItem
        key={id}
        onClick={onDrawerOpen}
        $isChecked={isChecked || false}
      >
        <List.Item.Meta
          avatar={
            <div onClick={clickHandler}>
              <Checkbox onChange={checkHandler} checked={isChecked} />
            </div>
          }
          title={<TodoName>{todoData?.name as string}</TodoName>}
        />
        {todoData?.subtodos?.length !== 0 && (
          <IconButton
            image={images.subTodo.default}
            squareSide="20px"
            isDisabled={true}
            paddings="0"
          />
        )}
      </SmallTodoListItem>

      <TodoRightDrawer
        id={id}
        visible={visible}
        onDrawerClose={onDrawerClose}
      />
    </>
  );
};

export default observer(SmallTodoItem);
