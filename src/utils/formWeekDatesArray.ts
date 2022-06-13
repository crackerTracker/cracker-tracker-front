import getWeekDayIndex from './getWeekDayIndex';

const formWeekDatesArray = (date: Date) => {
  const firstWeekDay = new Date(
    date.getTime() - getWeekDayIndex(date) * 24 * 60 * 60 * 1000
  );

  const arr = [];
  const currentWeekDay = firstWeekDay;

  for (let i = 0; i < 7; i++) {
    arr.push(currentWeekDay.getDate());
    currentWeekDay.setDate(currentWeekDay.getDate() + 1);
  }

  return arr;
};

export default formWeekDatesArray;
