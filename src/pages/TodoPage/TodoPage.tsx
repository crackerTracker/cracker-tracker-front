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
import IconButton from 'components/IconButton/IconButton';
import colors from 'styles/colors';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import TodoModal from './TodoModal';
import useTodo from './useTodo';
import { useTodoStore } from 'stores/hooks';

type PageType = 'all' | 'day' | 'week';

const TodoPage: FC = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split('/todo/')[1] || 'all';

  const todoStore = useTodoStore();

  const { value, inputChangeHandler, addTodo, clearValue } = useTodo({});

  const [nav, setNav] = useState<PageType>(currentLocation as PageType);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navButtonHandler = (destination: PageType) => {
    setNav(destination);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
  };

  const addTodoHandler = () => {
    addTodo();
    onModalCancel();
  };

  const onInputBlur = () => {
    todoStore.tempTodoName = value;
  };

  const toggleIcon = useCallback(() => {
    switch (todoStore.todosToggle) {
      case 0:
        return images.todoToggleAll.default;
      case 1:
        return images.todoToggleWDate.default;
      case 2:
        return images.todoToggleWoutDate.default;
    }
  }, [todoStore.todosToggle]);

  const toggleClick = useCallback(() => {
    switch (todoStore.todosToggle) {
      case 0:
        todoStore.setTodosToggle(1);
        break;
      case 1:
        todoStore.setTodosToggle(2);
        break;
      case 2:
        todoStore.setTodosToggle(0);
        break;
    }
  }, [todoStore.todosToggle]);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Row justify="space-between">
            <Col span={16}>
              <TitleGroup>
                <Title>{nav === 'all' ? 'Все задачи' : 'Неделя'}</Title>

                {nav === 'all' && (
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
              {nav !== 'all' && <SubTitle>{todoStore.headerDate}</SubTitle>}
            </Col>
            <Col span={8}>
              <Row justify="end">
                <Col>
                  <Link to="/todo">
                    <IconButton
                      backgroundColor={colors.brown}
                      image={images.todoNavigateAll.default}
                      onClick={() => navButtonHandler('all')}
                      isDisabled={nav === 'all'}
                    />
                  </Link>
                </Col>
                <Col offset={1}>
                  <Link to="week">
                    <IconButton
                      backgroundColor={colors.brown}
                      image={images.todoNavigateWeek.default}
                      onClick={() => navButtonHandler('week')}
                      isDisabled={nav === 'week'}
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
            value={value}
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
