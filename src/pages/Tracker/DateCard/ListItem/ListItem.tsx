import { List } from 'antd';
import React, { useMemo } from 'react';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import { CategoryType } from 'stores/TrackerStore/types';
import { Category } from './ListItem.styles';

type Props = {
  category: CategoryType;
  minutesSpent: number;
};

const ListItem: React.FC<Props> = ({ category, minutesSpent }) => {
  const timeSpent = useMemo(
    () => getMinsAndHoursStringFromMins(minutesSpent),
    [minutesSpent]
  );

  return (
    <List.Item extra={<div>{timeSpent}</div>}>
      <Category color={category.color}>{category.name}</Category>
    </List.Item>
  );
};

export default ListItem;
