const getWeekDayIndex = (date: Date) => {
  return date.getDay() === 0 ? 7 : date.getDay() - 1;
};

export default getWeekDayIndex;
