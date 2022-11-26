import * as React from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useChartsDrawerStore } from 'pages/Tracker/ChartsDrawer/store';
import { observer } from 'mobx-react-lite';
import { NoData, DisablingContainer, Wrapper } from './Chart.styles';
import { Loader } from 'pages/Tracker/ChartsDrawer/components/ui';
import {
  NO_DATA_TEXT,
  NO_DATA_TEXT_EXTRA,
} from 'pages/Tracker/ChartsDrawer/config';

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Chart: React.FC = () => {
  const {
    isPieChart,
    toShowLoader,
    toShowNoData,
    cleanData,
    pieChartController: {
      chartModel: {
        chartOptions: pieChartOptions,
        chartDataConfig: pieChartDataConfig,
      },
    },
    barChartController: {
      chartModel: {
        chartOptions: barChartOptions,
        chartDataConfig: barChartDataConfig,
      },
    },
  } = useChartsDrawerStore();

  return (
    // todo убрать клик после тестов
    <Wrapper onClick={cleanData}>
      <DisablingContainer turnOnDisabling={toShowLoader}>
        {isPieChart
          ? pieChartDataConfig && (
              <Pie data={pieChartDataConfig} options={pieChartOptions} />
            )
          : barChartDataConfig && (
              <Bar data={barChartDataConfig} options={barChartOptions} />
            )}
      </DisablingContainer>
      <Loader visible={toShowLoader} />
      <NoData visible={toShowNoData}>
        {NO_DATA_TEXT}. {NO_DATA_TEXT_EXTRA}
      </NoData>
    </Wrapper>
  );
};

export default observer(Chart);
