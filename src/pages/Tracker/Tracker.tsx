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
import ChartsDrawer from './ChartsDrawer';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner, {
  SpinnerSizesEnum,
  SpinnerThemesEnum,
} from 'components/Spinner';

const Tracker = () => {
  const { setActiveSection } = useNavbarStore();
  const {
    visible: categoriesDrawerVisible,
    onDrawerOpen: onCategoriesDrawerOpen,
    onDrawerClose: onCategoriesDrawerClose,
  } = useDrawer();
  const {
    visible: chartsDrawerVisible,
    onDrawerOpen: onChartsDrawerOpen,
    onDrawerClose: onChartsDrawerClose,
  } = useDrawer();

  const showDrawer = useCallback(
    (section: TrackerSectionsEnum) => () => {
      setActiveSection(section);
      switch (section) {
        case TrackerSectionsEnum.charts:
          onChartsDrawerOpen();
          break;
        case TrackerSectionsEnum.categories:
          onCategoriesDrawerOpen();
          break;
      }
    },
    []
  );

  const closeDrawer = useCallback(
    (section: TrackerSectionsEnum) => () => {
      setActiveSection(null);
      switch (section) {
        case TrackerSectionsEnum.charts:
          onChartsDrawerClose();
          break;
        case TrackerSectionsEnum.categories:
          onCategoriesDrawerClose();
          break;
      }
    },
    []
  );

  useInitSectionNavbar(trackerNavbarIcons, {
    [TrackerSectionsEnum.categories]: showDrawer(
      TrackerSectionsEnum.categories
    ),
    [TrackerSectionsEnum.charts]: showDrawer(TrackerSectionsEnum.charts),
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
                      <Spinner
                        theme={SpinnerThemesEnum.brown}
                        size={SpinnerSizesEnum.l}
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
      <CategoriesDrawer
        visible={categoriesDrawerVisible}
        onDrawerClose={closeDrawer(TrackerSectionsEnum.categories)}
      />
      <ChartsDrawer
        visible={chartsDrawerVisible}
        onDrawerClose={closeDrawer(TrackerSectionsEnum.charts)}
      />
    </>
  );
};

export default observer(Tracker);
