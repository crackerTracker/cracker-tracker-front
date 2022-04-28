import { Col, Row } from 'antd';
import ListComponent from 'pages/PomodoroPage/ListComponent';
import React, { FC } from 'react';
import 'antd/dist/antd.css';
import { Container, Wrapper } from './PomodoroPage.styles';
import TimerSection from './TimerSection';

const PomodoroPage: FC = () => {
  const isTick = false;

  return (
    <Wrapper isTick={isTick}>
      <Container>
        <Row justify="center">
          <Col span={7}>
            <TimerSection />
          </Col>

          <Col span={9} offset={2}>
            <ListComponent />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default PomodoroPage;
