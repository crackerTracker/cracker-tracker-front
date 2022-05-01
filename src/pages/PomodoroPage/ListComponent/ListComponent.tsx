import { Empty, List } from 'antd';
import DoneInput from 'pages/PomodoroPage/DoneInput';
import PlannedInput from 'pages/PomodoroPage/PlannedInput';
import TaskInput from 'pages/PomodoroPage/TaskInput';
import React, { FC, memo } from 'react';
import { Container, StyledList, Title } from './ListComponent.style';

export type PlannedPomoType = {
  task: string;
  amount: number;
};

export type DonePomoType = {
  task: string;
  minutes: number;
  startTime: string;
  endTime: string;
};

const plannedPomosData: PlannedPomoType[] = [
  {
    amount: 1,
    task: 'bubububu',
  },
  {
    amount: 3,
    task: 'pumpurum',
  },
  {
    amount: 4,
    task: 'qweqwqeqwq',
  },
  {
    amount: 2,
    task: 'meow',
  },
  {
    amount: 2,
    task: 'meow',
  },
  {
    amount: 2,
    task: 'meow',
  },
  {
    amount: 2,
    task: 'meow',
  },
];

const donePomosData: DonePomoType[] = [
  {
    task: 'bubububu',
    minutes: 50,
    startTime: '11:48',
    endTime: '12:48',
  },
  {
    task: 'pumpurum',
    minutes: 20,
    startTime: '10:48',
    endTime: '11:28',
  },
  {
    task: 'qweqwqeqwqe',
    minutes: 30,
    startTime: '15:48',
    endTime: '16:28',
  },
  {
    task: 'qweqwqeqwqe',
    minutes: 30,
    startTime: '15:48',
    endTime: '16:28',
  },
  {
    task: 'qweqwqeqwqe',
    minutes: 30,
    startTime: '15:48',
    endTime: '16:28',
  },
  {
    task: 'qweqwqeqwqe',
    minutes: 30,
    startTime: '15:48',
    endTime: '16:28',
  },
  {
    task: 'qweqwqeqwqe',
    minutes: 30,
    startTime: '15:48',
    endTime: '16:28',
  },
];

export const taskName = plannedPomosData.length ? plannedPomosData[0].task : '';

export const plannedPomosAmount = plannedPomosData.length
  ? plannedPomosData
      .map((item) => item.amount)
      .reduce((item, sum) => item + sum)
  : 0;

export const donePomosAmount = donePomosData.length;

export const leftPomosAmount =
  plannedPomosAmount && plannedPomosAmount - donePomosAmount;

export const computeStatsTime = (pomosAmount: number, pomoTime = 50) => {
  const resultTime = pomosAmount * pomoTime;
  const hours = Math.trunc(resultTime / 60) || 0;
  const mins = resultTime - hours * 60 || 0;
  return `${hours}ч ${mins}м`;
};

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
  return (
    <Container>
      <StyledList
        header={<Title>Запланировано</Title>}
        bordered
        dataSource={plannedPomosData}
        renderItem={(item) => (
          <List.Item>
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
        dataSource={donePomosData}
        renderItem={(item) => (
          <List.Item>
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

export default memo(ListComponent);
