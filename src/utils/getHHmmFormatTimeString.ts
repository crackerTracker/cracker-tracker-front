export const getHHmmFormatTimeString = (minutes: number, seconds: number) => {
  const formatMins = minutes < 10 ? `0${minutes}` : minutes;
  const formatSecs = seconds < 10 ? `0${seconds}` : seconds;
  return `${formatMins}:${formatSecs}`;
};
