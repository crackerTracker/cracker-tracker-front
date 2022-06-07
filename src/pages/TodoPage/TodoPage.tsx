import React, { FC, useCallback, useState } from 'react';
import { Col, Row, Space } from 'antd';
import {
  Wrapper,
  Container,
  Header,
  InputContainer,
  StyledInput,
  Title,
  Toggle,
  TitleGroup,
  SubTitle,
} from './TodoPage.styles';
import { images } from 'img/icons';
import IconButton from 'components/IconButton';
import colors from 'styles/colors';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import TodoModal from './TodoModal';
import useTodo from './useTodo';
import { useTodoStore } from 'stores/hooks';
import {
  TodoNavigateEnum,
  todosNavigateIcons,
  TodosToggleEnum,
  todosToggleIcons,
} from 'config/todo';

const TodoPage: FC = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split('/todo/')[1] || 'all';

  const todoStore = useTodoStore();
  const { headerDate } = useTodoStore();

  const { todoName, inputChangeHandler, addTodo, clearValue } = useTodo();

  const [nav, setNav] = useState(currentLocation as TodoNavigateEnum);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navButtonHandler = (destination: TodoNavigateEnum) => {
    setNav(destination);
  };

  const onModalOpen = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const addTodoHandler = () => {
    addTodo();
    onModalCancel();
  };

  const onInputBlur = () => {
    todoStore.setTempTodoName(todoName);
  };

  const toggleIcon = useCallback(() => {
    switch (todoStore.currentTodosToggle) {
      case TodosToggleEnum.all:
        return todosToggleIcons.all;

      case TodosToggleEnum.withDate:
        return todosToggleIcons.withDate;

      case TodosToggleEnum.withoutDate:
        return todosToggleIcons.withoutDate;
    }
  }, [todoStore.currentTodosToggle]);

  //todo setTodosToggle --> setToggleTodoItems
  const toggleClick = useCallback(() => {
    switch (todoStore.currentTodosToggle) {
      case TodosToggleEnum.all:
        todoStore.setTodosToggle(TodosToggleEnum.withDate);
        break;

      case TodosToggleEnum.withDate:
        todoStore.setTodosToggle(TodosToggleEnum.withoutDate);
        break;

      case TodosToggleEnum.withoutDate:
        todoStore.setTodosToggle(TodosToggleEnum.all);
        break;
    }
  }, [todoStore.currentTodosToggle]);

  const navButtonChange = (nav: TodoNavigateEnum) => () =>
    navButtonHandler(nav);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Row justify="space-between">
            <Col span={16}>
              <TitleGroup>
                <Title>
                  {nav === TodoNavigateEnum.all ? 'Все задачи' : 'Неделя'}
                </Title>

                {nav === TodoNavigateEnum.all && (
                  <Toggle>
                    <IconButton
                      backgroundColor={colors.lightBrown}
                      image={toggleIcon()}
                      onClick={toggleClick}
                      squareSide="35px"
                      paddings="0"
                    />
                  </Toggle>
                )}
              </TitleGroup>
              {nav !== TodoNavigateEnum.all && (
                <SubTitle>{headerDate}</SubTitle>
              )}
            </Col>
            <Col span={8}>
              <Row justify="end">
                <Col>
                  <Link to="/todo">
                    <IconButton
                      backgroundColor={colors.brown}
                      image={todosNavigateIcons.all}
                      onClick={navButtonChange(TodoNavigateEnum.all)}
                      isDisabled={nav === TodoNavigateEnum.all}
                    />
                  </Link>
                </Col>
                <Col offset={1}>
                  <Link to="week">
                    <IconButton
                      backgroundColor={colors.brown}
                      image={todosNavigateIcons.week}
                      onClick={navButtonChange(TodoNavigateEnum.week)}
                      isDisabled={nav === TodoNavigateEnum.week}
                    />
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>

        <Outlet />

        <InputContainer>
          <StyledInput
            placeholder="Добавить задачу"
            size="large"
            value={todoName}
            onChange={inputChangeHandler}
            onBlur={onInputBlur}
          />
          <Space size="large">
            <IconButton
              image={images.openTodoModalArrow.default}
              onClick={onModalOpen}
              squareSide="70px"
            />
            <IconButton
              image={images.plusGrayishBlue.default}
              onClick={addTodoHandler}
              squareSide="50px"
            />
          </Space>
        </InputContainer>

        <TodoModal
          isVisible={isModalVisible}
          onCancel={onModalCancel}
          clearMainInputValue={clearValue}
        />
      </Container>
    </Wrapper>
  );
};

export default observer(TodoPage);
