type ApiCommonPomoType = {
  _id: string;
  name: string;
};

export type CommonPomoType = {
  id: string;
  name: string;
};

// unique properties for pomo items
export type PlannedPomoProps = {
  pomodorosAmount: number;
};

export type DonePomoProps = {
  minutesSpent: number;
  startTime: string;
  endTime: string;
};

type UniquePomoProps = PlannedPomoProps | DonePomoProps;

// all properties for api planned or done item
export type ApiPomoType<T extends UniquePomoProps> = T & ApiCommonPomoType;

// all properties for normalized planned or done item
type PomoType<T extends UniquePomoProps> = CommonPomoType &
  Omit<ApiPomoType<T>, '_id'>;

export type PlannedPomoType = PomoType<PlannedPomoProps>;

export type DonePomoType = PomoType<DonePomoProps>;

export const normalizePomoItem = <T extends UniquePomoProps>({
  _id,
  ...rest
}: ApiPomoType<T>): PomoType<T> => {
  return {
    id: _id,
    ...rest,
  };
};

export const normalizePomoItems = <T extends UniquePomoProps>(
  items: ApiPomoType<T>[]
): PomoType<T>[] => {
  return items.reduce(
    (pomos, item) => [...pomos, normalizePomoItem<T>(item)],
    [] as PomoType<T>[]
  );
};
