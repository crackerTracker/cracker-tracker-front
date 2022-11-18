import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, ConfigProvider, Dropdown, Row } from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import IconButton from 'components/IconButton';
import RightSideDrawer from 'components/RightSideDrawer';
import { images } from 'img/icons';
import DrawerTodoCard from '../DrawerTodoCard';
import {
  GroupMenu,
  GroupMenuHeader,
  GroupMenuItem,
  StyledDatePicker,
  StyledIconButton,
  StyledTextArea,
} from './TodoRightDrawer.styles';
import useTodo from '../useTodo';
import formDateStringFromISO from 'utils/formDateStringFromISO';
import { useTodoStore } from 'stores/hooks';

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

  const addToGroup = (groupId: string) => {
    editTodo(
      _id,
      todoName,
      isChecked,
      deadline,
      note,
      undefined,
      undefined,
      groupId
    );
  };

  // todo consider no groups case
  const groupsMenu = useMemo(() => {
    // todo change to li?
    // "Menu is rendered as a ul ... its children should be Menu.* or encapsulated HOCs"
    const MenuHeader = () => <GroupMenuHeader>Выбор группы</GroupMenuHeader>;

    return (
      <GroupMenu>
        <MenuHeader />
        {groups.map(({ _id, name }) => (
          <GroupMenuItem key={_id} onClick={() => addToGroup(_id)}>
            {name}
          </GroupMenuItem>
        ))}
      </GroupMenu>
    );
  }, [groups]);

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
                  <Dropdown overlay={groupsMenu} trigger={['click']}>
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
