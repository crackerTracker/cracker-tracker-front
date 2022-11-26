import { ApiStatsCategoryType, BarChartApiDataType } from './types';

export const mockApiPieChartData: ApiStatsCategoryType[] = [
  {
    _id: '1',
    name: 'Frontend',
    color: 'red',
    minutesSpent: 300,
  },
  {
    _id: '2',
    name: 'Backend',
    color: 'blue',
    minutesSpent: 270,
  },
  {
    _id: '3',
    name: 'Useful',
    color: 'yellow',
    minutesSpent: 200,
  },
  {
    _id: '4',
    name: 'Guitar',
    color: 'green',
    minutesSpent: 100,
  },
  {
    _id: '5',
    name: 'Polytech',
    color: 'pink',
    minutesSpent: 40,
  },
  {
    _id: '6',
    name: 'Something',
    color: 'skyblue',
    minutesSpent: 10,
  },
];

export const mockApiBarChartData: BarChartApiDataType = {
  days: [
    1667854800000, 1667941200000, 1668027600000, 1668114000000, 1668200400000,
    1668286800000, 1668373200000,
  ],
  minutesPerCategory: [
    {
      category: {
        _id: '1',
        name: 'Frontend',
        color: 'red',
      },
      minutesPerDay: [180, 0, 50, 80, 120, 80, 20],
    },
    {
      category: {
        _id: '2',
        name: 'Backend',
        color: 'blue',
      },
      minutesPerDay: [120, 50, 70, 0, 160, 10, 20],
    },
    {
      category: {
        _id: '3',
        name: 'Useful',
        color: 'yellow',
      },
      minutesPerDay: [80, 200, 50, 0, 120, 100, 200],
    },
    {
      category: {
        _id: '4',
        name: 'Useful2',
        color: 'orange',
      },
      minutesPerDay: [80, 200, 50, 0, 120, 100, 200],
    },
  ],
};
