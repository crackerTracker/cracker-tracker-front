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
import { useNavbarStore, useTrackerStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';
import useInitSectionNavbar from 'utils/hooks/useInitSectionNavbar';
import { trackerNavbarIcons } from 'config/navbar';
import { TrackerSectionsEnum } from 'config/tracker';
import CategoriesDrawer from './CategoriesDrawer';
import useDrawer from 'utils/hooks/useDrawer';
import InfiniteScroll from 'react-infinite-scroller';

const Tracker = () => {
  const { setActiveSection } = useNavbarStore();
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const showDrawer = useCallback(() => {
    setActiveSection(TrackerSectionsEnum.categories);
    onDrawerOpen();
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveSection(null);
    onDrawerClose();
  }, []);

  useInitSectionNavbar(trackerNavbarIcons, {
    [TrackerSectionsEnum.categories]: showDrawer,
  });

  const { allDaysArray, init } = useTrackerStore();

  useEffect(() => {
    init();
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
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => console.log('hi')}
                  hasMore={true}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                  useWindow={false}
                >
                  <Cards>
                    <Row gutter={[24, 24]}>
                      {allDaysArray.map((day, timestamp) => (
                        <Col key={timestamp} span={windowWidth <= 1500 ? 8 : 6}>
                          <DateCard day={day} />
                        </Col>
                      ))}
                    </Row>
                  </Cards>
                </InfiniteScroll>
              </Relative>
            </Flex>
          </Col>
        </Row>
      </Container>
      <CategoriesDrawer visible={visible} onDrawerClose={closeDrawer} />
    </>
  );
};

export default observer(Tracker);
