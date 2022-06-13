import getWeekDayIndex from './getWeekDayIndex';

const givenWeekDayToEdgeISOString = (weekDayIndex: number, date: Date) => {
  const newDate = new Date(date);

  const firstWeekDate = date.getDate() - getWeekDayIndex(date);

  newDate.setDate(firstWeekDate + weekDayIndex);
  newDate.setUTCHours(23, 59, 59, 999);

  return newDate.toISOString();
};

export default givenWeekDayToEdgeISOString;
