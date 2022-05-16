const formWeekDatesArray = (date: Date) => {
  // index of week day
  const dayNumber = date.getDay() === 0 ? 7 : date.getDay();

  const firstWeekDay = new Date(
    date.getTime() - (dayNumber - 1) * 24 * 60 * 60 * 1000
  );

  const arr = [];

  for (let i = 0; i < 7; i++) {
    arr.push(firstWeekDay.getDate());
    firstWeekDay.setDate(firstWeekDay.getDate() + 1);
  }
  return arr;
};

export default formWeekDatesArray;
