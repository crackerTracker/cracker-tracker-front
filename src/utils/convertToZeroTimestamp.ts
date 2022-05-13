const msInDay = 86400000; // 1000 * 60 * 60 * 24

// convert ms, sec, min, hour to zeros in timestamp
const convertToZeroTimestamp = (timestamp: number) =>
  Math.trunc(timestamp / msInDay) * msInDay;

export default convertToZeroTimestamp;
