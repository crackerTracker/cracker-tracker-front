import { useEffect, useRef, useState } from 'react';
import { usePomodoroStore } from 'stores/hooks';

type OptionType = {
  add: string | number;
  diff: string | number;
};

export const useTimer = () => {
  const initialMinutes = 50;
  const [initial, setInitial] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(initialMinutes);

  const store = usePomodoroStore();
  const { markPomoDone, plannedPomosData } = usePomodoroStore();

  const [option, setOption] = useState<OptionType>({
    add: '1 минута',
    diff: '1 минута',
  });

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    resetTimeout();
    store.isTick = true;
    timerId.current = setTimeout(() => {
      setSeconds((s) => (s <= 0 ? 59 : s - 1));
      startTimer();
    }, 1000);
  };

  const stopTimer = () => {
    const spentMs = (initial * 60 - (minutes * 60 + seconds)) * 1000;

    const endTime = new Date();
    const endTimeStamp = endTime.toISOString();

    const startTime = new Date(endTime.getTime() - spentMs);
    const startTimeStamp = startTime.toISOString();

    if (store.isTick) {
      markPomoDone(
        plannedPomosData[0]._id,
        initial - minutes,
        startTimeStamp,
        endTimeStamp
      );

      setSeconds(0);
      setMinutes(initialMinutes);
      setInitial(initialMinutes);
      resetTimeout();
      store.isTick = false;
    }
  };

  const resetTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };

  const addMinutes = () => {
    let currentValue = option.add;

    if (typeof option.add === 'string') {
      currentValue = String(option.add).split(' ')[0];
    }

    setMinutes((t) => t + Number(currentValue));
    setInitial((t) => t + Number(currentValue));
  };

  const diffMinutes = () => {
    let currentValue = option.diff;

    if (typeof option.diff === 'string') {
      currentValue = String(option.diff).split(' ')[0];
    }

    setMinutes((t) => t - Number(currentValue));
    setInitial((t) => t - Number(currentValue));
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
  };
};
