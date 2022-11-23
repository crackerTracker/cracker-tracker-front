import * as React from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useChartsDrawerStore } from 'pages/Tracker/ChartsDrawer/store/ChartDrawerStore/context';
import { TrackerChartsEnum } from 'pages/Tracker/ChartsDrawer/config';
import { observer } from 'mobx-react-lite';
import { Wrapper } from './Chart.styles';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import { PieChartOptionsType } from '../../../../types';
import { PieChartController } from '../../../../store/ChartDrawerStore/store';

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// export const barData: ChartData<TrackerChartsEnum.bar, number[], string> = {
//   labels: [
//     '10.11.22',
//     '11.11.22',
//     '12.11.22',
//     '13.11.22',
//     '14.11.22',
//     '15.11.22',
//     '16.11.22',
//   ],
//   datasets: [
//     {
//       label: 'Frontend',
//       data: [180, 20, 30, 60, 0, 15, 40],
//       backgroundColor: 'rgb(255, 99, 132)',
//     },
//     {
//       label: 'Backend',
//       data: [120, 40, 0, 120, 240, 300, 0],
//       backgroundColor: 'rgb(255, 206, 86)',
//     },
//     {
//       label: 'Guitar',
//       data: [10, 30, 40, 50, 60, 70, 80],
//       backgroundColor: 'rgb(255, 159, 64)',
//     },
//   ],
// };
//
// export const barOptions: ChartOptions<TrackerChartsEnum.bar> = {
//   // Выключает относительное изменение размеров, чтобы легче позиционировать
//   maintainAspectRatio: false,
//   plugins: {
//     // Работа с тултипом:
//     tooltip: {
//       callbacks: {
//         /**
//          * Определяет заголовок тултипа. Вызывается при наведении на тултип.
//          * @param label - достаётся из объекта dataset первого объекта тултипа
//          * в приходящем в колбэек массиве тултипов.
//          * @return название категории
//          */
//         title: ([
//           // Тултип один, поэтому можно обращаться к первому элементу
//           {
//             dataset: { label },
//           },
//         ]) => label || '',
//
//         /**
//          * Определяет лэйбл тултипа. Вызывается при наведении на тултип
//          * @param raw - достаётся из приходящего в параметры объекта тултипа,
//          * представляет собой сырые данные (количество минут, уделённое категории)
//          * @return строка с количеством времени, уделённого категории
//          */
//         label: ({ raw }) => getMinsAndHoursStringFromMins(raw as number),
//       },
//     },
//   },
//   // Настройки осей графика
//   scales: {
//     x: {
//       // Стакает dataset'ы
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//       // Работа с делениями оси Y:
//       ticks: {
//         /**
//          * Определяет то, как будут выглядеть деления на оси Y
//          * @param value - количество минут
//          */
//         callback: (value) => getMinsAndHoursStringFromMins(Number(value)),
//       },
//     },
//   },
// };
//
// export const pieData: ChartData<TrackerChartsEnum.pie, number[], string> = {
//   labels: [
//     'Frontend',
//     'Backend',
//     'Guitar',
//     'Polytech',
//     'Something',
//     'SomethingElse',
//   ],
//   datasets: [
//     {
//       data: [120, 190, 30, 50, 20, 30],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//     },
//   ],
// };
//
// const pieOptions: ChartOptions<TrackerChartsEnum.pie> = {
//   maintainAspectRatio: false,
//   plugins: {
//     tooltip: {
//       callbacks: {
//         /**
//          * Определяет заголовок тултипа (название категории)
//          * @param label - название категории, достаётся из первого объекта тултипа
//          * (тултип один, поэтому можно обращаться к первому объекту)
//          */
//         title: ([{ label }]) => label,
//         // raw - количество минут на категорию
//         label: ({ raw }) => getMinsAndHoursStringFromMins(raw as number),
//       },
//     },
//   },
// };

const Chart: React.FC = () => {
  const {
    isPieChart,
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
      {isPieChart
        ? pieChartDataConfig && (
            <Pie data={pieChartDataConfig} options={pieChartOptions} />
          )
        : barChartDataConfig && (
            <Bar data={barChartDataConfig} options={barChartOptions} />
          )}
    </Wrapper>
  );
};

export default observer(Chart);
