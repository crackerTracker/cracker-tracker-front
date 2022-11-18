export enum PomoConditionType {
  done,
  planned,
}

// api types

type ApiCommonPomoType = {
  _id: string;
  name: string;
};

type ApiPlannedPomoProps = {
  pomodorosAmount: number;
};

type ApiDonePomoProps = {
  minutesSpent: number;
  startTime: string;
  endTime: string;
};

type ApiUniquePomoProps<T extends PomoConditionType> =
  T extends PomoConditionType.planned ? ApiPlannedPomoProps : ApiDonePomoProps;

// all properties for api planned or done item
type ApiPomoType<T extends PomoConditionType> = ApiUniquePomoProps<T> &
  ApiCommonPomoType;

export type ApiAllPomosType = {
  plan: ApiPomoType<PomoConditionType.planned>[];
  done: ApiPomoType<PomoConditionType.done>[];
};

// frontend types

export type CommonPomoType = {
  id: string;
  name: string;
};

// unique properties for pomo items
type PlannedPomoProps = {
  pomodorosAmount: number;
};

type DonePomoProps = {
  minutesSpent: number;
  startTime: string;
  endTime: string;
};

type UniquePomoProps<T extends PomoConditionType> =
  T extends PomoConditionType.planned ? PlannedPomoProps : DonePomoProps;

// all properties for normalized planned or done item
type PomoType<T extends PomoConditionType> = UniquePomoProps<T> &
  CommonPomoType;

export type PlannedPomoType = PomoType<PomoConditionType.planned>;

export type DonePomoType = PomoType<PomoConditionType.done>;

export const normalizePomoItem = <T extends PomoConditionType>({
  _id,
  ...rest
}: ApiPomoType<T>): PomoType<T> => {
  return {
    id: _id,
    ...rest,
  } as unknown as PomoType<T>;
};

export const normalizePomoItems = <T extends PomoConditionType>(
  items: ApiPomoType<T>[]
): PomoType<T>[] => {
  return items.map((item) => normalizePomoItem<T>(item));
};
