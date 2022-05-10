import React, { useMemo } from 'react';
import { List } from 'antd';
import moment from 'moment';
import { weekDayFormat } from 'config/tracker';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import ListItem from './ListItem';
import { StyledCard } from './DateCard.styles';
import { useTrackerStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

type Props = {
  timestamp: number;
};

const DateCard: React.FC<Props> = ({ timestamp }) => {
  const { datesMap } = useTrackerStore(); // todo мб лучше отдавать сюда таски или массив задач в пропсах?

  const tasks = datesMap[timestamp];

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
    <StyledCard title={`${monthDay}, ${weekDay}`} extra={totalTime}>
      {tasks.length}
      {/* todo разобраться, как сделать так, чтобы компонент следил за тасками, ибо без строки выше не обновлется состояние */}
      <List
        size="small"
        dataSource={tasks}
        renderItem={({ category, minutesSpent }) => (
          <ListItem
            key={category.id}
            category={category}
            minutesSpent={minutesSpent}
          />
        )}
      />
    </StyledCard>
  );
};

export default observer(DateCard);
