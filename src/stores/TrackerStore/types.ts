export type CategoryType = {
  id: string;
  name: string;
  color: string;
  isArchived: boolean;
};

export type TaskType = {
  id: string;
  timestamp: number;
  minutesSpent: number;
  category: CategoryType;
};
