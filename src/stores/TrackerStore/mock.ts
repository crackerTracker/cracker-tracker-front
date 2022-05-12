import { CategoryType, TaskType } from './types';

export const mockCategories: CategoryType[] = [
  {
    id: '1',
    name: 'University',
    color: '#3f3',
    isArchived: false,
  },
  {
    id: '2',
    name: 'Frontend',
    color: '#1272e0',
    isArchived: false,
  },
  {
    id: '3',
    name: 'Backend',
    color: '#d54d00',
    isArchived: false,
  },
  {
    id: '4',
    name: 'Project Activity',
    color: '#17bb66',
    isArchived: true,
  },
];

export const mockCategoriesMap: Record<string, CategoryType> = {
  '1': {
    id: '1',
    name: 'University',
    color: '#3f3',
    isArchived: false,
  },
  '2': {
    id: '2',
    name: 'Frontend',
    color: '#1272e0',
    isArchived: false,
  },
  '3': {
    id: '3',
    name: 'Backend',
    color: '#d54d00',
    isArchived: false,
  },
  '4': {
    id: '4',
    name: 'Project Activity',
    color: '#17bb66',
    isArchived: true,
  },
};

export const mockTasks: TaskType[] = [
  {
    id: '1',
    timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[1],
  },
  {
    id: '2',
    timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
    minutesSpent: 40,
    category: mockCategories[0],
  },
  {
    id: '3',
    timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[2],
  },
  {
    id: '4',
    timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[1],
  },
  {
    id: '5',
    timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
    minutesSpent: 70,
    category: mockCategories[2],
  },
  {
    id: '6',
    timestamp: Date.parse('2022-03-25T00:00:00.000Z'),
    minutesSpent: 70,
    category: mockCategories[3],
  },
  {
    id: '7',
    timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
    minutesSpent: 40,
    category: mockCategories[2],
  },
  {
    id: '8',
    timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[1],
  },
  {
    id: '9',
    timestamp: Date.parse('2022-05-02T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[0],
  },
  {
    id: '10',
    timestamp: Date.parse('2022-05-02T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[2],
  },
  {
    id: '11',
    timestamp: Date.parse('2022-05-01T00:00:00.000Z'),
    minutesSpent: 30,
    category: mockCategories[2],
  },
  {
    id: '12',
    timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
    minutesSpent: 70,
    category: mockCategories[0],
  },
];

export const mockDatesMap: Record<number, TaskType[]> = {
  [Date.parse('2022-05-03T00:00:00.000Z')]: [
    {
      id: '1',
      timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[1],
    },
    {
      id: '2',
      timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
      minutesSpent: 40,
      category: mockCategories[0],
    },
    {
      id: '3',
      timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[2],
    },
  ],
  [Date.parse('2022-05-04T00:00:00.000Z')]: [
    {
      id: '4',
      timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[1],
    },
    {
      id: '5',
      timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
      minutesSpent: 70,
      category: mockCategories[2],
    },
    {
      id: '12',
      timestamp: Date.parse('2022-05-04T00:00:00.000Z'),
      minutesSpent: 70,
      category: mockCategories[0],
    },
  ],
  [Date.parse('2022-03-25T00:00:00.000Z')]: [
    {
      id: '6',
      timestamp: Date.parse('2022-03-25T00:00:00.000Z'),
      minutesSpent: 70,
      category: mockCategories[3],
    },
  ],
  [Date.parse('2022-05-03T00:00:00.000Z')]: [
    {
      id: '7',
      timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
      minutesSpent: 40,
      category: mockCategories[2],
    },
    {
      id: '8',
      timestamp: Date.parse('2022-05-03T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[1],
    },
  ],
  [Date.parse('2022-05-02T00:00:00.000Z')]: [
    {
      id: '9',
      timestamp: Date.parse('2022-05-02T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[0],
    },
    {
      id: '10',
      timestamp: Date.parse('2022-05-02T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[2],
    },
  ],
  [Date.parse('2022-05-01T00:00:00.000Z')]: [
    {
      id: '11',
      timestamp: Date.parse('2022-05-01T00:00:00.000Z'),
      minutesSpent: 30,
      category: mockCategories[2],
    },
  ],
};
