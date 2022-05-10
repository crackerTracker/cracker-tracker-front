import React, { FC, FormEvent, useState } from 'react';
import { Col, Row, Space } from 'antd';
import IconButton from '../../components/IconButton/IconButton';
import colors from '../../styles/colors';
import {
  Wrapper,
  Container,
  Header,
  TextBlock,
  InputContainer,
  StyledInput,
  Title,
  Toggle,
  TitleGroup,
  Todos,
  StyledList,
} from './TodoPage.styles';

import { images } from 'img/icons';
import TodoItem from './TodoItem/TodoItem';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
];

const TodoPage: FC = () => {
  const [toggle, setToggle] = useState(0);
  const [value, setValue] = useState('');

  const toggleClick = () => {
    toggle === 2 ? setToggle(0) : setToggle((t) => t + 1);
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const navButtonHandler = (destination: string) => {
    switch (destination) {
      case 'all':
        console.log('navigate to all');
        break;
      case 'day':
        console.log('navigate to day');
        break;
      case 'week':
        console.log('navigate to week');
        break;
    }
  };

  const inputModalOpener = () => {
    console.log('*opening modal*');
  };

  const addTodoHandler = () => {
    setValue('');
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Row justify="space-between">
            <Col>
              <TextBlock>
                <TitleGroup>
                  <Title>Все задачи</Title>

                  <Toggle>
                    {toggle === 0 && (
                      <IconButton
                        backgroundColor={colors.lightBrown}
                        image={images.todoToggleAll.default}
                        onClick={toggleClick}
                      />
                    )}
                    {toggle === 1 && (
                      <IconButton
                        backgroundColor={colors.lightBrown}
                        image={images.todoToggleWDate.default}
                        onClick={toggleClick}
                      />
                    )}
                    {toggle === 2 && (
                      <IconButton
                        backgroundColor={colors.lightBrown}
                        image={images.todoToggleWoutDate.default}
                        onClick={toggleClick}
                      />
                    )}
                  </Toggle>
                </TitleGroup>
              </TextBlock>
            </Col>
            <Col>
              <Space size="large">
                <IconButton
                  backgroundColor={colors.brown}
                  image={images.todoNavigateAll.default}
                  onClick={() => navButtonHandler('all')}
                  isDisabled={true}
                />
                <IconButton
                  backgroundColor={colors.brown}
                  image={images.todoNavigateDay.default}
                  onClick={() => navButtonHandler('day')}
                />
                <IconButton
                  backgroundColor={colors.brown}
                  image={images.todoNavigateWeek.default}
                  onClick={() => navButtonHandler('week')}
                />
              </Space>
            </Col>
          </Row>
        </Header>

        <Todos>
          <StyledList
            size="large"
            bordered
            dataSource={data}
            renderItem={(item) => <TodoItem item={item as string} />}
          />
        </Todos>

        <InputContainer>
          <StyledInput
            placeholder="Добавить задачу"
            size="large"
            value={value}
            onChange={inputHandler}
          />
          <Space size="large">
            <IconButton
              image={images.openTodoModalArrow.default}
              onClick={inputModalOpener}
              squareSide="70px"
            />
            <IconButton
              image={images.plusGrayishBlue.default}
              onClick={addTodoHandler}
              squareSide="50px"
            />
          </Space>
        </InputContainer>
      </Container>
    </Wrapper>
  );
};

export default TodoPage;
