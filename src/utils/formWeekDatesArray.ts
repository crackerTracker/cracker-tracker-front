import getWeekDayIndex from './getWeekDayIndex';

const formWeekDatesArray = (date: Date) => {
  const firstWeekDay = new Date(
    date.getTime() - getWeekDayIndex(date) * 24 * 60 * 60 * 1000
  );

  const arr = [];

  for (let index = 0; index < 7; index++) {
    arr.push(firstWeekDay.getDate() + index);
  }

  return arr;
};

export default formWeekDatesArray;
