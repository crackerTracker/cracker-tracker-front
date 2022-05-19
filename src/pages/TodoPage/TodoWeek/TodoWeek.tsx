import { Col, ConfigProvider, DatePicker, Row } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import moment, { Moment } from 'moment';
import SmallTodoItem from './SmallTodoItem';
import { Container, StyledCard, WeekDate } from './TodoWeek.styles';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { observer } from 'mobx-react-lite';
import formWeekDatesArray from 'utils/formWeekDatesArray';
import { weekDaysNames } from 'config/todo';
import { useTodoStore } from 'stores/hooks';
import givenDayToEdgeISOString from 'utils/givenDayToEdgeISOString';

const TodoWeek: FC = () => {
  const todoStore = useTodoStore();

  const [momentValue, setMoment] = useState<Moment | null>(null);
  const [date, setDate] = useState(new Date());

  const weekDatesArray = useCallback(() => {
    return formWeekDatesArray(date);
  }, [date]);

  const onPickerChange = (momentValue: Moment | null) => {
    if (!momentValue) {
      setDate(new Date());
      setMoment(null);

      todoStore.headerDate = String(moment(new Date()).format('MMMM Y'));
    } else {
      setDate(new Date(String(momentValue)));
      setMoment(momentValue);

      todoStore.headerDate = String(momentValue.format('MMMM Y'));
    }
  };

  const filterTodos = (i: number) => {
    return i !== 7
      ? todoStore.todos.filter(
          (todo) =>
            new Date(todo.deadline).toISOString() ===
            givenDayToEdgeISOString(i, date)
        )
      : todoStore.todos.filter((todo) => !todo.deadline);
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
        {filterTodos(i).map((todo) => (
          <SmallTodoItem key={todo._id} {...todo} />
        ))}
      </StyledCard>
    </Col>
  ));

  return (
    <ConfigProvider locale={locale}>
      <Row justify="end">
        <DatePicker
          onChange={onPickerChange}
          picker="week"
          mode="week"
          size="large"
          placement="bottomRight"
          value={momentValue}
          format={'y, w[-я неделя]'}
        />
      </Row>

      <Container>
        <Row gutter={[24, 24]}>{cardsArray}</Row>
      </Container>
    </ConfigProvider>
  );
};

export default observer(TodoWeek);
