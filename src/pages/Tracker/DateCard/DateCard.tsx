import React from 'react';
import { List } from 'antd';
import ListItem from './ListItem';
import { StyledCard } from './DateCard.styles';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { DayType } from 'stores/TrackerStore/types';
import DateCardStore from './DateCardStore';

type Props = {
  day: DayType;
};

const DateCard: React.FC<Props> = ({ day }) => {
  const { dayTitle, totalTimeString, tasks } = useLocalObservable(
    () => new DateCardStore(day)
  );

  const renderListItem = React.useCallback(
    (task) => <ListItem key={task.category.id} task={task} />,
    []
  );

  return (
    <StyledCard title={dayTitle} extra={totalTimeString}>
      <List size="small" dataSource={tasks} renderItem={renderListItem} />
    </StyledCard>
  );
};

export default observer(DateCard);
