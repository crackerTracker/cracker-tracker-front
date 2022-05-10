import React from 'react';
import { Cards, Container, Flex } from './Tracker.styles';
import { Col, Row } from 'antd';
import ControlPanel from './ControlPanel';
import DateCard from './DateCard';
import { useTrackerStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

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
            <Cards>
              <Row gutter={[24, 24]}>
                {datesArray.map((timestamp) => (
                  <Col key={timestamp} span={6}>
                    <DateCard timestamp={Number(timestamp)} />
                  </Col>
                ))}
              </Row>
            </Cards>
          </Flex>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(Tracker);
