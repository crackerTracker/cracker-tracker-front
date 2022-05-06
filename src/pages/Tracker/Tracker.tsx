import React from 'react';
import { Container, Flex } from './Tracker.styles';
import { Col, Input, Row } from 'antd';
import ControlPanel from './ControlPanel';

const Tracker = () => {
  return (
    <Container>
      <Row justify="center" style={{ height: '100%' }}>
        <Col style={{ height: '100%' }} span={18}>
          <Flex>
            <div>
              <ControlPanel />
            </div>
          </Flex>
        </Col>
      </Row>
    </Container>
  );
};

export default Tracker;
