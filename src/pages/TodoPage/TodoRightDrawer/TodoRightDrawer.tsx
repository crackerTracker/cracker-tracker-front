import { Col, ConfigProvider, Row } from 'antd';
import IconButton from 'components/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import { images } from 'img/icons';
import React, { FC } from 'react';
import DrawerTodoCard from '../DrawerTodoCard';
import { StyledDatePicker, StyledTextArea } from './TodoRightDrawer.styles';
import useTodo from '../useTodo';
import { observer } from 'mobx-react-lite';
import formDateStringFromISO from 'utils/formDateStringFromISO';
import { useTodoStore } from 'stores/hooks';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

export type TodoRightDrawerProps = {
  _id: string;
  visible: boolean;
  onDrawerClose: VoidFunction;
};

const TodoRightDrawer: FC<TodoRightDrawerProps> = ({
  _id,
  visible,
  onDrawerClose,
}) => {
  const {
    value,
    inputChangeHandler,
    deleteTodoHandler,
    deadline,
    onDeadlineChange,
    deleteDeadline,
    note,
    onTextAreaChange,
    isChecked,
    isPickerOpen,
    datePickerHandler,
  } = useTodo({ _id });

  const { editTodo } = useTodoStore();

  const onTextareaBlur = () => {
    editTodo(_id, value, isChecked, deadline, note);
  };

  const onDeadlineDelete = () => {
    deleteDeadline();
    editTodo(_id, value, isChecked, null);
  };

  return (
    <RightSideDrawer
      onDrawerClose={onDrawerClose}
      visible={visible}
      headerDate={deadline && `Выполнить до ${formDateStringFromISO(deadline)}`}
      footerChildren={
        <ConfigProvider locale={locale}>
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
                      onClick={onDeadlineDelete}
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
                onClick={deleteTodoHandler}
                paddings="0"
              />
            </Col>
          </Row>
        </ConfigProvider>
      }
    >
      <DrawerTodoCard _id={_id} onCreateChangeHandler={inputChangeHandler} />

      <div>
        <StyledTextArea
          rows={4}
          placeholder="Написать заметку"
          bordered={false}
          autoSize
          value={note}
          onChange={onTextAreaChange}
          onBlur={onTextareaBlur}
        />
      </div>
    </RightSideDrawer>
  );
};

export default observer(TodoRightDrawer);
