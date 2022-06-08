import { SubtodoType } from 'stores/TodoStore/types';

export const filterSubTodos = (subTodos: SubtodoType[], id: string) => {
  return subTodos
    .filter((sub) => sub._id !== id)
    .map((sub) => ({ name: sub.name, done: sub.done }));
};
