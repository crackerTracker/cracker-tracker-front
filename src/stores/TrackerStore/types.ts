export type ApiCategoryType = {
  _id: string;
  name: string;
  color: string;
  isArchived: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  color: string;
  isArchived: boolean;
};

export type ApiTaskType = {
  _id: string;
  date: number;
  minutesSpent: number;
  category: ApiCategoryType;
};

export type TaskType = {
  id: string;
  timestamp: number;
  minutesSpent: number;
  category: CategoryType;
};

export const normalizeCategory = ({
  _id,
  ...rest
}: ApiCategoryType): CategoryType => ({
  id: _id,
  ...rest,
});

export const normalizeCategories = (
  categories: ApiCategoryType[]
): Record<string, CategoryType> => {
  return categories.reduce((acc: any, category) => {
    acc[category._id] = normalizeCategory(category);
    return acc;
  }, {});
};

export const normalizeTask = (
  { _id, date, minutesSpent, category }: ApiTaskType,
  categories?: Record<string, CategoryType>
): TaskType => {
  return {
    id: _id,
    timestamp: new Date(date).getTime(),
    minutesSpent,
    category: categories?.[category._id] || normalizeCategory(category),
  };
};

// export const normalizeTasks = (
//   sourceTasks: ApiTaskType[],
//   categories?: Record<string, CategoryType>
// ): Record<string, TaskType> => {
//   return sourceTasks.reduce((acc: any, task) => {
//     acc[task._id] = normalizeTask(task, categories);
//     return acc;
//   }, {});
// };

export const normalizeTasksToDatesMap = (
  sourceTasks: ApiTaskType[],
  categories?: Record<string, CategoryType>
): Record<number, TaskType[]> => {
  return sourceTasks.reduce((acc: any, task) => {
    const normalizedTask = normalizeTask(task, categories);
    const timestamp = normalizedTask.timestamp;

    if (!acc[timestamp]) {
      acc[timestamp] = [normalizedTask];
    } else {
      acc[timestamp].push(normalizedTask);
    }

    return acc;
  }, {});
};
