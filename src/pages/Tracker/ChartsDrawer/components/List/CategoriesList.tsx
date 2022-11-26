import * as React from 'react';
import { List } from 'antd';

import { AntList, Color, ScrollContainer } from './CategoriesList.styles';
import { useChartsDrawerStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { LightCenteredText, Loader } from '../ui';
import { NO_DATA_TEXT } from '../../config';

const CategoriesList: React.FC = () => {
  const {
    isPieChart,
    toShowLoader,
    toShowNoData,
    pieChartController: {
      chartModel: {
        formattedCategoriesList: pieChartFormattedCategoriesList,
        othersCategories: pieChartOthersCategories,
      },
    },
    barChartController: {
      chartModel: { formattedCategoriesList: barChartFormattedCategoriesList },
    },
  } = useChartsDrawerStore();

  // Реф первого элемента списка для скролла к началу списка при смене графика
  const firstItemRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (firstItemRef.current) {
      firstItemRef.current?.scrollIntoView({
        block: 'end',
      });
    }
  }, [isPieChart]);

  const listToRender = React.useMemo(
    () =>
      isPieChart
        ? pieChartFormattedCategoriesList ?? undefined
        : barChartFormattedCategoriesList ?? undefined,
    [
      isPieChart,
      !!pieChartFormattedCategoriesList,
      !!barChartFormattedCategoriesList,
    ]
  );

  const toRenderOthersCategories =
    isPieChart && listToRender && pieChartOthersCategories;

  return (
    <>
      <ScrollContainer turnOnDisabling={toShowLoader}>
        <AntList
          dataSource={listToRender}
          locale={{
            emptyText: toShowNoData ? (
              <LightCenteredText>{NO_DATA_TEXT}</LightCenteredText>
            ) : (
              ' '
            ),
          }}
          renderItem={({ id, name, color, percentString }, index) => (
            <>
              <List.Item key={id} actions={[<>{percentString ?? ''}</>]}>
                <>
                  <List.Item.Meta
                    title={name}
                    avatar={<Color color={color} />}
                  />
                  {/* Ant-список не предоставляет рефа, чтобы проскроллить
                к началу списка, поэтому использую кастыль */}
                  {index === 0 && <div ref={firstItemRef} />}
                </>
              </List.Item>
              {/*  */}
              {toRenderOthersCategories && index === listToRender.length - 1 && (
                <List.Item
                  actions={[<>{pieChartOthersCategories.percentString}</>]}
                >
                  <List.Item.Meta
                    title={pieChartOthersCategories.name}
                    avatar={<Color color={pieChartOthersCategories.color} />}
                  />
                </List.Item>
              )}
            </>
          )}
        />
      </ScrollContainer>
      <Loader visible={toShowLoader} />
    </>
  );
};

export default observer(CategoriesList);
