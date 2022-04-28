import { List } from 'antd';
import DoneInput from 'pages/PomodoroPage/DoneInput';
import PlannedInput from 'pages/PomodoroPage/PlannedInput';
import TaskInput from 'pages/PomodoroPage/TaskInput';
import React, { FC } from 'react';
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

export const taskName = plannedPomosData[0].task;

export const plannedPomosAmount = plannedPomosData
  .map((item) => item.amount)
  .reduce((item, sum) => item + sum);

export const donePomosAmount = donePomosData.length;

export const leftPomosAmount = plannedPomosAmount - donePomosAmount;

export const computeStatsTime = (pomosAmount: number, pomoTime = 50) => {
  const resultTime = pomosAmount * pomoTime;
  const hours = Math.trunc(resultTime / 60);
  const mins = resultTime - hours * 60;
  return `${hours}ч ${mins}м`;
};

const ListComponent: FC = () => {
  return (
    <>
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
        />
      </Container>
    </>
  );
};

export default ListComponent;
