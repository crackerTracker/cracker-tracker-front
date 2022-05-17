import React, { useCallback, useEffect } from 'react';
import { Cards, Container, Flex } from './Tracker.styles';
import { Col, Row } from 'antd';
import ControlPanel from './ControlPanel';
import DateCard from './DateCard';
import { useTrackerStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';
import useInitSectionNavbar from 'utils/hooks/useInitSectionNavbar';
import { trackerNavbarIcons } from 'config/navbar';
import { TrackerSectionsEnum } from 'config/tracker';
import useDrawer from 'components/RightSideDrawer/useDrawer';
import CategoriesDrawer from './CategoriesDrawer';

const Tracker = () => {
  const log = useCallback(() => console.log('click'), []);

  useInitSectionNavbar(trackerNavbarIcons, {
    [TrackerSectionsEnum.categories]: log,
    [TrackerSectionsEnum.statistics]: log,
  });

  const { visible, setVisible, onDrawerClose } = useDrawer();

  useEffect(() => {
    setVisible(true);
  }, []);

  const { datesArray } = useTrackerStore();

  const windowWidth = document.documentElement.clientWidth;

  return (
    <>
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
                    <Col key={timestamp} span={windowWidth <= 1500 ? 8 : 6}>
                      <DateCard timestamp={Number(timestamp)} />
                    </Col>
                  ))}
                </Row>
              </Cards>
            </Flex>
          </Col>
        </Row>
      </Container>
      <CategoriesDrawer
        visible={visible}
        onDrawerClose={onDrawerClose}
      ></CategoriesDrawer>
    </>
  );
};

export default observer(Tracker);
