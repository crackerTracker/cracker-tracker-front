import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { useChartsDrawerStore } from 'pages/Tracker/ChartsDrawer/store';
import { Loader } from 'pages/Tracker/ChartsDrawer/components/ui';
import {
  NO_DATA_TEXT,
  NO_DATA_TEXT_EXTRA,
} from 'pages/Tracker/ChartsDrawer/config';

import { MessageContainer, DisablingContainer, Wrapper } from './Chart.styles';

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
    toShowError,
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
      <MessageContainer visible={toShowNoData}>
        {NO_DATA_TEXT}. {NO_DATA_TEXT_EXTRA}
      </MessageContainer>
      <MessageContainer visible={toShowError}>
        Произошла ошибка
      </MessageContainer>
    </Wrapper>
  );
};

export default observer(Chart);
