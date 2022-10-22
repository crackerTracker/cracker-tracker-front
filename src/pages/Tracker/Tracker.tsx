import React, { useCallback, useEffect } from 'react';
import {
  Cards,
  Container,
  ControlPanelWrapper,
  Flex,
  LoaderContainer,
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
import { SpinnerCircularFixed } from 'spinners-react';
import colors, { halfOpacityColors } from 'styles/colors';

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

  const {
    allDaysArray,
    init,
    loadMoreAfterLastMonth,
    canLoadMoreExtraTasks,
    setScrollContainerRef,
  } = useTrackerStore();

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    init();

    // инициализировать реф контейнера, в котором скроллятся дни
    setScrollContainerRef(scrollContainerRef.current);
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
              <Relative ref={scrollContainerRef}>
                <InfiniteScroll
                  initialLoad={false}
                  loadMore={loadMoreAfterLastMonth}
                  hasMore={canLoadMoreExtraTasks}
                  loader={
                    <LoaderContainer>
                      {/* todo мб вынести в компонент */}
                      <SpinnerCircularFixed
                        size={70}
                        thickness={150}
                        speed={150}
                        color={colors.brown}
                        secondaryColor={halfOpacityColors.brown}
                      />
                    </LoaderContainer>
                  }
                  useWindow={false}
                >
                  <Cards>
                    <Row gutter={[24, 24]}>
                      {allDaysArray.map((day) => (
                        <Col
                          key={day.timestamp}
                          span={windowWidth <= 1500 ? 8 : 6}
                        >
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
