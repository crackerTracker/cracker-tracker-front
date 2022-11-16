export type PomoItemType = {
  _id: string;
  name: string;
};

export type PlannedPomoType = PomoItemType & {
  pomodorosAmount: number;
};

export type DonePomoType = {
  _id: string;
  name: string;
  minutesSpent: number;
  startTime: string;
  endTime: string;
};
