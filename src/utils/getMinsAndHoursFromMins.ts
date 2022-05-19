const getMinsAndHoursFromMins = (
  minutes: number
): { hours: number; minutes: number } => {
  const hours = Math.trunc(minutes / 60);
  const mins = minutes - hours * 60;

  return {
    hours,
    minutes: mins,
  };
};

export const getMinsAndHoursStringFromMins = (minutes: number): string => {
  const { minutes: mins, hours } = getMinsAndHoursFromMins(minutes);

  if (hours && mins) {
    return `${hours}ч ${mins}м`;
  }

  if (hours) {
    return `${hours}ч`;
  }

  return `${mins}м`;
};

export default getMinsAndHoursFromMins;
