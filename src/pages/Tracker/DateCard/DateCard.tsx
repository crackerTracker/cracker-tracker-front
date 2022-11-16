import React, { useMemo } from 'react';
import { List } from 'antd';
import moment from 'moment';
import { WEEK_DAY_FORMAT } from 'config/tracker';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import ListItem from './ListItem';
import { StyledCard } from './DateCard.styles';
import { useTrackerStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

type Props = {
  timestamp: number;
};

const DateCard: React.FC<Props> = ({ timestamp }) => {
  const { datesMap } = useTrackerStore();
  const tasks = datesMap[timestamp];

  const fullDate = useMemo(() => {
    const date = new Date(timestamp);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }, [timestamp]);

  const weekDay = useMemo(
    () => moment(timestamp).format(WEEK_DAY_FORMAT),
    [timestamp]
  );

  const totalMinutes = tasks.reduce((sum, task) => sum + task.minutesSpent, 0);
  const totalTime = getMinsAndHoursStringFromMins(totalMinutes);

  return (
    <StyledCard title={`${fullDate}, ${weekDay}`} extra={totalTime}>
      <List
        size="small"
        dataSource={tasks}
        renderItem={(task) => <ListItem key={task.category.id} task={task} />}
      />
    </StyledCard>
  );
};

export default observer(DateCard);
