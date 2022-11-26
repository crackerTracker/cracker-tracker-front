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
import { Loader } from '../../../ui';
import { NO_DATA_TEXT, NO_DATA_TEXT_EXTRA } from '../../../../config';

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
    <Wrapper>
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
