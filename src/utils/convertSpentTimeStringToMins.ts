const hoursSubstringReg = /^(\d+)[hHчЧ]/; // get '10h' substring
const minsSubstringReg = /(\d+)[mMмМ]$/; // get '10m' substring

const convertSpentTimeStringToMins = (spentTime: string) => {
  const hoursSubstring = spentTime.match(hoursSubstringReg)?.[0];
  const hours = hoursSubstring ? parseInt(hoursSubstring, 10) : 0;

  const minsSubstring = spentTime.match(minsSubstringReg)?.[0];
  const mins = minsSubstring ? parseInt(minsSubstring, 10) : 0;

  return hours * 60 + mins;
};

export default convertSpentTimeStringToMins;
