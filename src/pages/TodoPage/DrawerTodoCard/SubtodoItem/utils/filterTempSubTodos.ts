import { SubtodoType } from 'stores/TodoStore/types';

export const filterTempSubTodos = (tempSubTodos: SubtodoType[], id: string) => {
  return tempSubTodos
    .filter((sub) => sub._id !== id)
    .map((sub) => ({ _id: sub._id, name: sub.name, done: sub.done }));
};
