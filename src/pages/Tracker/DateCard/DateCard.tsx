import React from 'react';
import { List } from 'antd';
import ListItem from './ListItem';
import { StyledCard } from './DateCard.styles';
import { observer } from 'mobx-react-lite';
import { DayType } from 'stores/TrackerStore/types';
import DateCardStore from './DateCardStore';

type Props = {
  day: DayType;
};

const DateCard: React.FC<Props> = ({ day }) => {
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  const [{ dayTitle, totalTimeString, tasks }, setDateCardStore] =
    React.useState(() => new DateCardStore(day));

  // подписаться на изменение day и пересоздавать локальный стор при наличии изменений,
  // исключая первый рендер компонента
  React.useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    setDateCardStore(() => new DateCardStore(day));
  }, [day]);

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
