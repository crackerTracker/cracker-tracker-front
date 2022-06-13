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

const SmallTodoItem: FC<{ _id: string }> = ({ _id }) => {
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const { todoData, isChecked, checkHandler } = useTodo({ _id });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <SmallTodoListItem
        key={_id}
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
        {!!todoData?.subTodos?.length && (
          <IconButton
            image={images.subTodo.default}
            squareSide="20px"
            isDisabled={true}
            paddings="0"
          />
        )}
      </SmallTodoListItem>

      <TodoRightDrawer
        _id={_id}
        visible={visible}
        onDrawerClose={onDrawerClose}
      />
    </>
  );
};

export default observer(SmallTodoItem);
