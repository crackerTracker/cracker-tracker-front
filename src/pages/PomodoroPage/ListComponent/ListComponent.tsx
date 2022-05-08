import { Empty, List } from 'antd';
import { observer } from 'mobx-react-lite';
import DoneInput from 'pages/PomodoroPage/DoneInput';
import PlannedInput from 'pages/PomodoroPage/PlannedInput';
import TaskInput from 'pages/PomodoroPage/TaskInput';
import React, { FC, useEffect } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { DonePomoType, PlannedPomoType } from 'stores/PomodoroStore';
import { Container, StyledList, Title } from './ListComponent.style';

type PlaceholderProps = {
  isPlanned?: boolean;
};

const TaskPlaceholder = ({ isPlanned }: PlaceholderProps) => {
  const text = isPlanned ? 'запланированных' : 'выполненных';
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 60,
      }}
      description={<span>Нет {text} задач</span>}
    />
  );
};

const ListComponent: FC = () => {
  const store = usePomodoroStore();

  useEffect(() => {
    store.requestAllPomos();
  }, [store]);

  return (
    <Container>
      <StyledList
        header={<Title>Запланировано</Title>}
        bordered
        dataSource={store.plannedPomosData}
        renderItem={(item) => (
          <List.Item key={(item as PlannedPomoType)._id}>
            <PlannedInput {...(item as PlannedPomoType)} />
          </List.Item>
        )}
        locale={{
          emptyText: <TaskPlaceholder isPlanned />,
        }}
      />

      <StyledList
        header={<Title>Выполнено</Title>}
        footer={<TaskInput />}
        bordered
        dataSource={store.donePomosData}
        renderItem={(item) => (
          <List.Item key={(item as DonePomoType)._id}>
            <DoneInput {...(item as DonePomoType)} />
          </List.Item>
        )}
        locale={{
          emptyText: <TaskPlaceholder />,
        }}
      />
    </Container>
  );
};

export default observer(ListComponent);
