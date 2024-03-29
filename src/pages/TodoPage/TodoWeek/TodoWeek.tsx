import { Col, ConfigProvider, DatePicker, Row } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import SmallTodoItem from './SmallTodoItem';
import { Container, StyledCard, WeekDate } from './TodoWeek.styles';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { observer } from 'mobx-react-lite';
import formWeekDatesArray from 'utils/formWeekDatesArray';
import { weekDaysNames } from 'config/todo';
import { FULL_MONTH_YEAR_FORMAT } from 'config/datesTimeFormats';
import { useTodoStore } from 'stores/hooks';
import givenWeekDayToEdgeISOString from 'utils/givenWeekDayToEdgeISOString';

const TodoWeek: FC = () => {
  const { todos, setHeaderDate } = useTodoStore();

  const [momentValue, setMoment] = useState<Moment | null>(null);
  const [date, setDate] = useState(new Date());

  const weekDatesArray = useMemo(() => {
    return formWeekDatesArray(date);
  }, [date]);

  const onPickerChange = (momentValue: Moment | null) => {
    if (!momentValue) {
      setDate(new Date());
      setMoment(null);

      setHeaderDate(String(moment(new Date()).format(FULL_MONTH_YEAR_FORMAT)));
    } else {
      setDate(new Date(String(momentValue)));
      setMoment(momentValue);

      setHeaderDate(String(momentValue.format(FULL_MONTH_YEAR_FORMAT)));
    }
  };

  const filterTodos = (weekDayIndex: number) => {
    return weekDayIndex !== 7
      ? todos.filter(
          (todo) =>
            new Date(todo.deadline).toISOString() ===
            givenWeekDayToEdgeISOString(weekDayIndex, date)
        )
      : todos.filter((todo) => !todo.deadline);
  };

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
        <Row gutter={[24, 24]}>
          {weekDaysNames.map((day, index) => (
            <Col span={6} key={day.id}>
              <StyledCard
                bordered={false}
                title={
                  <>
                    {index !== 7 && (
                      <WeekDate>{String(weekDatesArray[index])}</WeekDate>
                    )}{' '}
                    {day.name}
                  </>
                }
              >
                {filterTodos(index).map((todo) => (
                  <SmallTodoItem key={todo._id} {...todo} />
                ))}
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Container>
    </ConfigProvider>
  );
};

export default observer(TodoWeek);
