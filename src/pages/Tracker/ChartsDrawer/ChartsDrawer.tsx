import * as React from 'react';
import RightSideDrawer, {
  RightSideDrawerProps,
} from 'components/RightSideDrawer';
import { CategoriesBlock, ChartBlock } from './ChartsDrawer.styles';
import { Row } from 'antd';
import { images } from 'img/icons';
import ToggleIconButton from './components/ToggleIconButton';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ChartsDrawerStore from './store/ChartDrawerStore';
import { TrackerChartsEnum } from './config';
import ChartPanel from './components/ChartPanel';

type Props = Pick<RightSideDrawerProps, 'visible' | 'onDrawerClose'>;

const ChartsDrawer: React.FC<Props> = ({ onDrawerClose, visible }) => {
  const { chartType, onChangeChartType } = useLocalObservable(
    () => new ChartsDrawerStore()
  );

  // todo добавить логику переключения графиков
  const onClickChangeChartType = React.useCallback(
    (chartType: TrackerChartsEnum) => () => {
      onChangeChartType(chartType);
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
      <CategoriesBlock>dfsdfds</CategoriesBlock>
    </RightSideDrawer>
  );
};

export default observer(ChartsDrawer);
