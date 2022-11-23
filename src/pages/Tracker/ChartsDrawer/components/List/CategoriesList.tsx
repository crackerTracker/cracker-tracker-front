import * as React from 'react';
import { List, Skeleton } from 'antd';

import { AntList, Color } from './CategoriesList.styles';
import { mockListCategories } from '../../mock';
import { useChartsDrawerStore } from '../../store';
import { observer } from 'mobx-react-lite';

const CategoriesList: React.FC = () => {
  const {
    isPieChart,
    pieChartController: {
      chartModel: { formattedCategoriesList: pieChartFormattedCategoriesList },
    },
    barChartController: {
      chartModel: { formattedCategoriesList: barChartFormattedCategoriesList },
    },
  } = useChartsDrawerStore();

  return (
    <AntList
      dataSource={
        isPieChart
          ? pieChartFormattedCategoriesList ?? undefined
          : barChartFormattedCategoriesList ?? undefined
      }
      renderItem={({ id, name, color, percentString }) => (
        <List.Item key={id} actions={[<>{percentString ?? ''}</>]}>
          <List.Item.Meta title={name} avatar={<Color color={color} />} />
        </List.Item>
      )}
    />
  );
};

export default observer(CategoriesList);
