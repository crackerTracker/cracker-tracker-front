import * as React from 'react';
import RightSideDrawer, {
  RightSideDrawerProps,
} from 'components/RightSideDrawer';
import { CategoriesBlock, ChartBlock } from './ChartsDrawer.styles';
import { Row } from 'antd';
import { images } from 'img/icons';
import { ToggleIconButton, ChartPanel, CategoriesList } from './components';
import { observer } from 'mobx-react-lite';
import { TrackerChartsEnum } from './config';
import { useChartsDrawerStore, withChartsDrawerStoreProvider } from './store';

type Props = Pick<RightSideDrawerProps, 'visible' | 'onDrawerClose'>;

const ChartsDrawer: React.FC<Props> = ({ onDrawerClose, visible }) => {
  const {
    chartType,
    onChangeChartType,
    barChartController,
    pieChartController,
    isPieChart,
  } = useChartsDrawerStore();

  React.useEffect(() => {
    isPieChart
      ? pieChartController.initModel()
      : barChartController.initModel();
  }, []);

  const onClickChangeChartType = React.useCallback(
    (chartType: TrackerChartsEnum) => async () => {
      await onChangeChartType(chartType);
    },
    []
  );

  return (
    <RightSideDrawer
      visible={visible}
      onDrawerClose={onDrawerClose}
      headerTitle="Статистика"
      footerChildren={
        <Row justify="end">
          <ToggleIconButton
            image={images.solidGraphBrown.default}
            onClick={onClickChangeChartType(TrackerChartsEnum.bar)}
            isActive={chartType === TrackerChartsEnum.bar}
          />
          <ToggleIconButton
            image={images.solidPieChartBrown.default}
            onClick={onClickChangeChartType(TrackerChartsEnum.pie)}
            isActive={chartType === TrackerChartsEnum.pie}
          />
        </Row>
      }
    >
      <ChartBlock>
        <ChartPanel />
      </ChartBlock>
      <CategoriesBlock>
        <CategoriesList />
      </CategoriesBlock>
    </RightSideDrawer>
  );
};

export default withChartsDrawerStoreProvider(observer(ChartsDrawer));
