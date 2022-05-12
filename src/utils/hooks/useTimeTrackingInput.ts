import { ChangeEvent, useState } from 'react';

const useTimeTrackingInput = (initialTime?: string) => {
  const [time, setTime] = useState(initialTime || '');
  const [timeError, setTimeError] = useState(false);

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);

    if (timeError) {
      setTimeError(false);
    }
  };

  return {
    time,
    setTime,
    timeError,
    setTimeError,
    onChangeTime,
  };
};

export default useTimeTrackingInput;
