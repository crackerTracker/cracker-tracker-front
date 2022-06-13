export type TodoType = {
  _id: string;
  name: string;
  done: boolean;
  deadline: string;
  note: string;
  subTodos: SubtodoType[];
};

export type SubtodoType = {
  _id: string;
  name: string;
  done: boolean;
};
