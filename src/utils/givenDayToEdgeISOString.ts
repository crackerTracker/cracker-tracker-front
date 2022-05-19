const givenDayToEdgeISOString = (i: number, date: Date) => {
  const newDate = new Date(date);

  const dayNumber = date.getDay() === 0 ? 7 : date.getDay();

  const firstWeekDate = date.getDate() - dayNumber + 1;

  newDate.setDate(firstWeekDate + i);
  newDate.setUTCHours(23, 59, 59, 999);

  return newDate.toISOString();
};

export default givenDayToEdgeISOString;
