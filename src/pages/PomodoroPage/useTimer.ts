import { useEffect, useRef, useState } from 'react';

type OptionType = {
  add: string | number;
  diff: string | number;
};

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(50);
  const [isTick, setIsTick] = useState(false);

  const [option, setOption] = useState<OptionType>({
    add: '1 минута',
    diff: '1 минута',
  });

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    resetTimeout();
    setIsTick(true);
    timerId.current = setTimeout(() => {
      setSeconds((s) => (s <= 0 ? 59 : s - 1));
      startTimer();
    }, 1000);
  };

  const stopTimer = () => {
    setSeconds(0);
    setMinutes(50);
    resetTimeout();
    setIsTick(false);
  };

  const resetTimeout = () => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
    }
  };

  const addMinutes = () => {
    let currentValue = option.add;

    // changing default option value to number type
    if (typeof option.add === 'string') {
      currentValue = String(option.add).split(' ')[0];
    }

    setMinutes((t) => t + Number(currentValue));
  };

  const diffMinutes = () => {
    let currentValue = option.diff;

    // changing default option value to number type
    if (typeof option.diff === 'string') {
      currentValue = String(option.diff).split(' ')[0];
    }

    setMinutes((t) => t - Number(currentValue));
  };

  useEffect(() => {
    if (seconds === 59) setMinutes((m) => m - 1);
    if (seconds === 0 && minutes === 0) stopTimer();
  }, [seconds]);

  useEffect(() => {
    return () => resetTimeout();
  }, []);

  return {
    startTimer,
    stopTimer,
    addMinutes,
    diffMinutes,
    setOption,
    seconds,
    minutes,
    option,
    isTick,
  };
};
