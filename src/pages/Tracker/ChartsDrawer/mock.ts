import { CategoryType } from 'stores/TrackerStore/types';

import {
  ApiStatsCategoryType,
  BarChartApiDataType,
  DaysMapApiStatsCategoryType,
} from './types';

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
    1667854800, 1667941200, 1668027600, 1668114000, 1668200400, 1668286800,
    1668373200,
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
  ],
};

export const mockListCategories: (Pick<
  CategoryType,
  'id' | 'name' | 'color'
> & {
  percentString?: string;
})[] = [
  {
    id: '1',
    name: 'Frontend',
    color: 'pink',
    percentString: '30%',
  },
  {
    id: '2',
    name: 'Backend',
    color: 'blue',
    percentString: '20%',
  },
  {
    id: '3',
    name: 'Useful',
    color: 'yellow',
    percentString: '15%',
  },
  {
    id: '4',
    name: 'Guitar',
    color: 'green',
    percentString: '14%',
  },
  {
    id: '5',
    name: 'Polytech',
    color: 'pink',
    percentString: '10%',
  },
  {
    id: '6',
    name: 'Something',
    color: 'skyblue',
    percentString: '7%',
  },
  {
    id: '7',
    name: 'Something2',
    color: 'red',
    percentString: '4%',
  },
];
