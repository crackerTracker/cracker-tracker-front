import { Col, Row } from 'antd';
import IconButton from 'components/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import { images } from 'img/icons';
import React, { FC } from 'react';
import DrawerTodoCard from '../DrawerTodoCard';
import { StyledDatePicker, StyledTextArea } from './TodoRightDrawer.styles';
import useTodo from '../useTodo';
import { observer } from 'mobx-react-lite';

export type TodoRightDrawerProps = {
  id: number;
  visible: boolean;
  onDrawerClose: VoidFunction;
};

const TodoRightDrawer: FC<TodoRightDrawerProps> = ({
  id,
  visible,
  onDrawerClose,
}) => {
  const {
    deleteTodo,
    deadline,
    onDeadlineChange,
    deleteDeadline,
    note,
    onTextAreaChange,
    isPickerOpen,
    datePickerHandler,
  } = useTodo({ id });

  return (
    <RightSideDrawer
      onDrawerClose={onDrawerClose}
      visible={visible}
      headerDate={deadline && `Выполнить до ${deadline}`}
      footerChildren={
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Row align="middle">
              <Col>
                <StyledDatePicker
                  open={isPickerOpen}
                  onOpenChange={datePickerHandler}
                  onChange={onDeadlineChange}
                  bordered={false}
                />
                <IconButton
                  image={images.clock.default}
                  squareSide="35px"
                  onClick={datePickerHandler}
                  paddings="0"
                />
              </Col>

              {!!deadline && (
                <Col offset={1}>
                  <IconButton
                    image={images.closeBrown.default}
                    squareSide="15px"
                    onClick={deleteDeadline}
                    paddings="0"
                  />
                </Col>
              )}
            </Row>
          </Col>

          <Col>
            <IconButton
              image={images.deleteBrown.default}
              squareSide="35px"
              onClick={deleteTodo}
              paddings="0"
            />
          </Col>
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
  );
};

export default observer(TodoRightDrawer);
