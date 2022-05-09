import React, { useMemo } from 'react';
import { Card, List } from 'antd';
import { mockDatesMap } from 'stores/TrackerStore/mock';
import moment from 'moment';
import { weekDayFormat } from 'config/tracker';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import ListItem from './ListItem';

type Props = {
  timestamp: number;
};

const DateCard: React.FC<Props> = ({ timestamp }) => {
  const tasks = mockDatesMap[timestamp];

  const monthDay = useMemo(() => new Date(timestamp).getDate(), [timestamp]);

  const weekDay = useMemo(
    () => moment(timestamp).format(weekDayFormat),
    [timestamp]
  );

  const totalTime = useMemo(() => {
    const totalMinutes = tasks.reduce(
      (sum, task) => sum + task.minutesSpent,
      0
    );

    return getMinsAndHoursStringFromMins(totalMinutes);
  }, [tasks]);

  return (
    <Card title={`${monthDay}, ${weekDay}`} extra={totalTime}>
      <List
        size="small"
        dataSource={tasks}
        renderItem={({ category, minutesSpent }) => (
          <ListItem category={category} minutesSpent={minutesSpent} />
        )}
      />
    </Card>
  );
};

export default DateCard;
