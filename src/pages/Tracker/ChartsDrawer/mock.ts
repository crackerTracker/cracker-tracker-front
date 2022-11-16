import { ApiPieChartCategoryRecordType } from './types';

export const mockApiPieChartData: ApiPieChartCategoryRecordType[] = [
  {
    _id: '1',
    name: 'Frontend',
    color: 'red',
    minutesSpent: 300,
    isArchived: false,
  },
  {
    _id: '2',
    name: 'Backend',
    color: 'blue',
    minutesSpent: 270,
    isArchived: false,
  },
  {
    _id: '3',
    name: 'Useful',
    color: 'yellow',
    minutesSpent: 200,
    isArchived: false,
  },
  {
    _id: '4',
    name: 'Guitar',
    color: 'green',
    minutesSpent: 100,
    isArchived: false,
  },
  {
    _id: '5',
    name: 'Polytech',
    color: 'pink',
    minutesSpent: 40,
    isArchived: false,
  },
  {
    _id: '6',
    name: 'Something',
    color: 'skyblue',
    minutesSpent: 10,
    isArchived: true,
  },
];
