import { Col, Row } from 'antd';
import ListComponent from 'pages/PomodoroPage/ListComponent';
import React, { FC } from 'react';
import 'antd/dist/antd.css';
import { Container, Wrapper } from './PomodoroPage.styles';
import TimerSection from './TimerSection';
import { usePomodoroStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

const PomodoroPage: FC = () => {
  const { timerState } = usePomodoroStore();

  return (
    <Wrapper timerState={timerState}>
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

export default observer(PomodoroPage);
