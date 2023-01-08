import convertToZeroTimestamp from './convertToZeroTimestamp';

const formZeroISOStringFromTimestamp = (timestamp: number) =>
  new Date(convertToZeroTimestamp(timestamp)).toISOString();

export default formZeroISOStringFromTimestamp;
