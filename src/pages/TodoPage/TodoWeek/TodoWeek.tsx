import { Col, ConfigProvider, DatePicker, Row } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { Moment } from 'moment';
import SmallTodoItem from './SmallTodoItem';
import { Container, StyledCard, WeekDate } from './TodoWeek.styles';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import TodoMockStore from '../todoMockData';
import { observer } from 'mobx-react-lite';
import formWeekDatesArray from 'utils/formWeekDatesArray';
import { weekDaysNames } from 'config/todo';

const TodoWeek: FC = () => {
  const todoStore = new TodoMockStore();

  const [moment, setMoment] = useState<Moment | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const weekDatesArray = useCallback(() => {
    return formWeekDatesArray(date);
  }, [date]);

  const onChange = (moment: Moment | null) => {
    setDate(new Date(String(moment)));
    setMoment(moment);

    if (!moment) {
      setDate(new Date());
      setMoment(null);
    } else {
      todoStore.headerDate = String(moment?.format('MMMM Y'));
    }
  };

  const cardsArray = weekDaysNames.map((day, i) => (
    <Col span={6} key={day.id}>
      <StyledCard
        bordered={false}
        title={
          <>
            {i !== 7 && <WeekDate>{String(weekDatesArray()[i])}</WeekDate>}{' '}
            {day.name}
          </>
        }
      >
        {todoStore.todos.map((todo) => (
          <SmallTodoItem key={todo.id} {...todo} />
        ))}
      </StyledCard>
    </Col>
  ));

  return (
    <>
      <ConfigProvider locale={locale}>
        <Row justify="end">
          <DatePicker
            onChange={onChange}
            picker="week"
            mode="week"
            size="large"
            placement="bottomRight"
            value={moment}
            format={'y, w[-я неделя]'}
          />
        </Row>

        <Container>
          <Row gutter={[24, 24]}>{cardsArray}</Row>
        </Container>
      </ConfigProvider>
    </>
  );
};

export default observer(TodoWeek);
