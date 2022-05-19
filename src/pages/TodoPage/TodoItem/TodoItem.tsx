import { List, Row } from 'antd';
import { message, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import IconButton from 'components/IconButton/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import useDrawer from 'components/RightSideDrawer/useDrawer';
import { images } from 'img/icons';
import { Moment } from 'moment';
import React, { FC, FormEvent, memo, useState } from 'react';
import DrawerTodoCard from '../DrawerTodoCard';
import todos from '../todoMockData';
import {
  Icon,
  StyledCheckbox,
  ListTodoItem,
  StyledTextArea,
  StyledDatePicker,
} from './TodoItem.styles';

const TodoItem: FC<{ id: number }> = ({ id }) => {
  const todoData = todos.find((todo) => todo.id === id);

  const [isChecked, setIsChecked] = useState(todoData?.done);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [deadline, setDeadline] = useState(todoData?.deadline);
  const [note, setNote] = useState(todoData?.note);

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

  const datePickerHandler = () => {
    setIsPickerOpen((v) => !v);
  };

  const onTextAreaChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setNote(e.currentTarget.value);
  };

  const deleteDeadline = () => {
    setDeadline('');
  };

  const onChange = (date: Moment | null) => {
    setDeadline(new Date(String(date)).toLocaleDateString());
  };

  return (
    <>
      <RightSideDrawer
        onDrawerClose={onDrawerClose}
        visible={visible}
        headerDate={deadline && `Выполнить до ${deadline}`}
        footerChildren={
          <Row justify="space-between">
            <Row align="middle">
              <IconButton
                image={images.clock.default}
                squareSide="55px"
                onClick={datePickerHandler}
              />
              {!!deadline && (
                <IconButton
                  image={images.closeBrown.default}
                  squareSide="35px"
                  onClick={deleteDeadline}
                />
              )}
            </Row>

            <StyledDatePicker
              open={isPickerOpen}
              onOpenChange={datePickerHandler}
              onChange={onChange}
              bordered={false}
            />

            <IconButton
              image={images.deleteBrown.default}
              squareSide="55px"
              onClick={deleteTodoHandler}
            />
          </Row>
        }
      >
        <DrawerTodoCard id={id} />

        <div>
          <StyledTextArea
            rows={4}
            placeholder="Написать заметку"
            bordered={false}
            autoSize
            value={note}
            onChange={onTextAreaChange}
          />
        </div>
      </RightSideDrawer>

      <ListTodoItem onClick={todoItemClick} $isChecked={isChecked || false}>
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
            <Icon image={images.subTodo.default} />
          )}
          <div onClick={clickHandler}>
            <IconButton
              image={images.deletePeach.default}
              squareSide="45px"
              onClick={deleteTodoHandler}
            />
          </div>
        </Space>
      </ListTodoItem>
    </>
  );
};

export default memo(TodoItem);
