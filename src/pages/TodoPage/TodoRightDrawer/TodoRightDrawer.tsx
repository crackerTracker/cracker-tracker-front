import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, ConfigProvider, Dropdown, Row } from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import IconButton from 'components/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import { images } from 'img/icons';
import DrawerTodoCard from '../DrawerTodoCard';
import {
  StyledDatePicker,
  StyledIconButton,
  StyledTextArea,
} from './TodoRightDrawer.styles';
import useTodo from '../useTodo';
import formDateStringFromISO from 'utils/formDateStringFromISO';
import { useTodoStore } from 'stores/hooks';
import GroupsDropdownMenu from './GroupsDropdownMenu';
import GroupsMenu from '../GroupsMenu';

type TodoRightDrawerProps = {
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
    todoName,
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

  const { editTodo, getGroups, groups } = useTodoStore();

  const onTextareaBlur = () => {
    editTodo(_id, todoName, isChecked, deadline, note);
  };

  const onDeadlineDelete = () => {
    deleteDeadline();
    editTodo(_id, todoName, isChecked, null);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

  const addToGroup = async (groupId: string) => {
    await editTodo(
      _id,
      todoName,
      isChecked,
      deadline,
      note,
      undefined,
      undefined,
      groupId
    );
    setIsGroupDropdownOpen(false);
  };

  return (
    <RightSideDrawer
      onDrawerClose={onDrawerClose}
      visible={visible}
      headerTitle={
        deadline && `Выполнить до ${formDateStringFromISO(deadline)}`
      }
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
                  <StyledIconButton
                    image={images.clock.default}
                    squareSide="35px"
                    onClick={datePickerHandler}
                    paddings="0"
                  />
                </Col>

                {!!deadline && (
                  <Col>
                    <StyledIconButton
                      image={images.closeBrown.default}
                      squareSide="15px"
                      onClick={onDeadlineDelete}
                      paddings="0"
                      margin="0 20px 0 0"
                    />
                  </Col>
                )}

                <Col>
                  <Dropdown
                    overlay={GroupsDropdownMenu({
                      groups,
                      addToGroup,
                      todoId: _id,
                      setIsOpen: setIsGroupDropdownOpen,
                    })}
                    trigger={['click']}
                    visible={isGroupDropdownOpen}
                    onVisibleChange={setIsGroupDropdownOpen}
                  >
                    <IconButton
                      image={images.addToGroupBrown.default}
                      squareSide="35px"
                      paddings="0"
                    />
                  </Dropdown>
                </Col>
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
      <DrawerTodoCard _id={_id} />

      <GroupsMenu />

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
