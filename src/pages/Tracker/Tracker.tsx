import React from 'react';
import { Container, Flex } from './Tracker.styles';
import { Col, Row } from 'antd';
import ControlPanel from './ControlPanel';
import DateCard from './DateCard';
import { useTrackerStore } from 'stores/hooks';

const Tracker = () => {
  const { datesArray } = useTrackerStore();

  return (
    <Container>
      <Row justify="center" style={{ height: '100%' }}>
        <Col style={{ height: '100%' }} span={18}>
          <Flex>
            <div>
              <ControlPanel />
            </div>
            <div>
              <Row gutter={[24, 24]}>
                {datesArray.map((timestamp) => (
                  <Col key={timestamp} span={6}>
                    <DateCard timestamp={Number(timestamp)} />
                  </Col>
                ))}
              </Row>
            </div>
          </Flex>
        </Col>
      </Row>
    </Container>
  );
};

export default Tracker;
