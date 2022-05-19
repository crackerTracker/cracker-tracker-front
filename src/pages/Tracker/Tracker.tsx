import React, { useCallback, useEffect } from 'react';
import {
  Cards,
  Container,
  ControlPanelWrapper,
  Flex,
  Relative,
} from './Tracker.styles';
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
  const { visible, setVisible, onDrawerClose } = useDrawer();

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  useInitSectionNavbar(trackerNavbarIcons, {
    [TrackerSectionsEnum.categories]: showDrawer,
  });

  const { datesArray, getAllTasksInDatesMap, getAllCategories } =
    useTrackerStore();

  useEffect(() => {
    getAllCategories();
    getAllTasksInDatesMap();
  }, []);

  const windowWidth = document.documentElement.clientWidth;

  return (
    <>
      <Container>
        <Row justify="center" style={{ height: '100%' }}>
          <Col style={{ height: '100%' }} span={18}>
            <Flex>
              <ControlPanelWrapper>
                <ControlPanel />
              </ControlPanelWrapper>
              <Relative>
                <Cards>
                  <Row gutter={[24, 24]}>
                    {datesArray.map((timestamp) => (
                      <Col key={timestamp} span={windowWidth <= 1500 ? 8 : 6}>
                        <DateCard timestamp={Number(timestamp)} />
                      </Col>
                    ))}
                  </Row>
                </Cards>
              </Relative>
            </Flex>
          </Col>
        </Row>
      </Container>
      <CategoriesDrawer visible={visible} onDrawerClose={onDrawerClose} />
    </>
  );
};

export default observer(Tracker);
