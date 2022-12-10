import { observer } from 'mobx-react-lite';
import { Row } from 'antd';
import * as React from 'react';

import RightSideDrawer, {
  RightSideDrawerProps,
} from 'components/RightSideDrawer';
import { images } from 'img/icons';

import { CategoriesBlock, ChartBlock } from './ChartsDrawer.styles';
import { ToggleIconButton, ChartPanel, CategoriesList } from './components';
import { TrackerChartsEnum } from './config';
import { useChartsDrawerStore, withChartsDrawerStoreProvider } from './store';

type Props = Pick<RightSideDrawerProps, 'visible' | 'onDrawerClose'>;

const ChartsDrawer: React.FC<Props> = ({ onDrawerClose, visible }) => {
  const { chartType, onChangeChartType, handleChangeVisibility } =
    useChartsDrawerStore();

  React.useEffect(() => {
    handleChangeVisibility(visible);
  }, [visible]);

  const onClickChangeChartType = (chartType: TrackerChartsEnum) => async () => {
    await onChangeChartType(chartType);
  };

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
