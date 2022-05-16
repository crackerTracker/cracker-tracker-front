import { makeAutoObservable } from 'mobx';

export type TodoType = {
  id: number;
  name: string;
  done: boolean;
  deadline: string;
  note: string;
  subtodos: SubtodoType[];
};

export type SubtodoType = {
  id: number;
  name: string;
  done: boolean;
};

class TodoMockStore {
  public todos: TodoType[] = [
    {
      id: 1,
      name: 'Racing car sprays burning fuel into crowd.',
      done: false,
      deadline: '20.05.2022',
      note: '',
      subtodos: [
        { id: 1, name: 'sub11', done: true },
        { id: 2, name: 'sub12', done: false },
      ],
    },
    {
      id: 2,
      name: 'Japanese princess to wed commoner.',
      done: true,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
    {
      id: 3,
      name: 'Australian walks 100km after outback crash.',
      done: false,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
    {
      id: 4,
      name: 'Man charged over missing wedding girl.',
      done: false,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
    {
      id: 5,
      name: 'Los Angeles battles huge wildfires.',
      done: false,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
    {
      id: 6,
      name: 'Los Angeles battles huge wildfires.',
      done: false,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
    {
      id: 7,
      name: 'Los Angeles battles huge wildfires.',
      done: false,
      deadline: '',
      note: 'some note',
      subtodos: [],
    },
  ];
  public headerDate = 'may, 2022';

  constructor() {
    makeAutoObservable(this);
  }
}

export default TodoMockStore;
