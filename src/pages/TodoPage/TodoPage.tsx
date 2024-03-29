import React, { FC, useCallback, useState, useEffect } from 'react';
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
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import TodoModal from './TodoModal';
import { useTodoStore } from 'stores/hooks';
import {
  TodoNavigateEnum,
  todosNavigateIcons,
  todosToggleIcons,
  todosTogglesChangeMap,
  todosTogglesTitle,
} from 'config/todo';
import TodoLeftDrawer from './TodoLeftDrawer';
import { useGroupsDrawer, useTodo } from './hooks';

const TodoPage: FC = () => {
  const param = useParams();

  const location = useLocation();
  const currentLocation =
    location.pathname.split('/')[2] || TodoNavigateEnum.all;

  const { headerDate, currentTodosToggle, setTempTodoName, setTodosToggle } =
    useTodoStore();

  const { todoName, inputChangeHandler, addTodo, clearValue } = useTodo();

  const { visible, onDrawerCloseHandler } = useGroupsDrawer();

  const [nav, setNav] = useState(currentLocation as TodoNavigateEnum);

  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (currentLocation in TodoNavigateEnum) {
      setNav(currentLocation as TodoNavigateEnum);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation === TodoNavigateEnum.group && param.name) {
      setGroupName(param.name);
    }
  }, [param.name]);

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setTempTodoName(todoName);
  };

  const toggleClick = () => {
    setTodosToggle(todosTogglesChangeMap[currentTodosToggle]);
  };

  const navButtonChange = (nav: TodoNavigateEnum) => () => setNav(nav);

  return (
    <>
      <Wrapper>
        <Container>
          <Header>
            <Row justify="space-between">
              <Col span={16}>
                <TitleGroup>
                  <Title
                    title={nav === TodoNavigateEnum.group ? groupName : ''}
                  >
                    {nav === TodoNavigateEnum.all && 'Все задачи'}
                    {nav === TodoNavigateEnum.week && 'Неделя'}
                    {nav === TodoNavigateEnum.group && groupName}
                  </Title>

                  {nav === TodoNavigateEnum.all && (
                    <Toggle title={todosTogglesTitle[currentTodosToggle]}>
                      <IconButton
                        backgroundColor={colors.lightBrown}
                        image={todosToggleIcons[currentTodosToggle]}
                        onClick={toggleClick}
                        squareSide="35px"
                        paddings="0"
                      />
                    </Toggle>
                  )}
                </TitleGroup>
                {nav === TodoNavigateEnum.week && (
                  <SubTitle>{headerDate}</SubTitle>
                )}
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <Link to="/todo">
                      <IconButton
                        backgroundColor={colors.brown}
                        image={todosNavigateIcons[TodoNavigateEnum.all]}
                        onClick={navButtonChange(TodoNavigateEnum.all)}
                        isDisabled={nav === TodoNavigateEnum.all}
                      />
                    </Link>
                  </Col>
                  <Col offset={1}>
                    <Link to="week">
                      <IconButton
                        backgroundColor={colors.brown}
                        image={todosNavigateIcons[TodoNavigateEnum.week]}
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
                image={images.upArrowBrown.default}
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

      <TodoLeftDrawer onDrawerClose={onDrawerCloseHandler} visible={visible} />
    </>
  );
};

export default observer(TodoPage);
