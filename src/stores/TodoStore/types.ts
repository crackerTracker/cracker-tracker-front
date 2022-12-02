export type TodoGroupType = {
  _id: string;
  name: string;
};

export type TodoType = {
  _id: string;
  name: string;
  done: boolean;
  deadline: string;
  note: string;
  subTodos: SubtodoType[];
  group: TodoGroupType;
  isImportant: boolean;
  today: boolean;
};

export type SubtodoType = {
  _id: string;
  name: string;
  done: boolean;
};
