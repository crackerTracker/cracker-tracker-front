import {
  defaultInitialMinutes,
  defaultLongRestMinutes,
  defaultRestMinutes,
  maxSeriesCount,
  OptionsEnum,
  pomoRestSettings,
  pomoSeriesItem,
  TimerStatesEnum,
} from 'config/pomoconf';
import { useEffect, useRef, useState } from 'react';
import { usePomodoroStore } from 'stores/hooks';

type OptionType = {
  add: string | number;
  diff: string | number;
};

export const useTimer = () => {
  const [initialMinutes, setInitialMinutes] = useState(defaultInitialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(defaultInitialMinutes);

  const store = usePomodoroStore();
  const { markPomoDone, plannedPomosData } = usePomodoroStore();

  const [option, setOption] = useState<OptionType>({
    add: OptionsEnum[1],
    diff: OptionsEnum[1],
  });

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (store.timerState === TimerStatesEnum.off)
      store.setTimerState(TimerStatesEnum.work);

    resetTimeout();

    timerId.current = setTimeout(() => {
      setSeconds((s) => (s <= 0 ? 59 : s - 1));
      startTimer();
    }, 1000);
  };

  const stopTimer = () => {
    if (store.timerState === TimerStatesEnum.rest) {
      stopRestTimer();
    }

    if (store.timerState === TimerStatesEnum.work) {
      stopWorkTimer();
      store.setTimerState(TimerStatesEnum.rest);
      startTimer();
    }
  };

  const stopWorkTimer = () => {
    const spentMs = (initialMinutes * 60 - (minutes * 60 + seconds)) * 1000;

    const endTime = new Date();
    const endTimeISOString = endTime.toISOString();

    const startTime = new Date(endTime.getTime() - spentMs);
    const startTimeISOString = startTime.toISOString();

    const minDiff = initialMinutes - minutes > 0 ? initialMinutes - minutes : 1;

    markPomoDone(
      plannedPomosData[0].id,
      minDiff,
      startTimeISOString,
      endTimeISOString
    );

    setSeconds(0);
    setMinutes(getCurrentRestMinutes());

    resetTimeout();
  };

  const stopRestTimer = () => {
    store.setTimerState(TimerStatesEnum.off);

    setSeconds(0);
    setMinutes(defaultInitialMinutes);
    setInitialMinutes(defaultInitialMinutes);

    resetTimeout();
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
    setInitialMinutes((t) => t + Number(currentValue));
  };

  const diffMinutes = () => {
    let currentValue = option.diff;

    if (typeof option.diff === 'string') {
      currentValue = String(option.diff).split(' ')[0];
    }

    if (minutes - Number(currentValue) > 0) {
      setMinutes((t) => t - Number(currentValue));
      setInitialMinutes((t) => t - Number(currentValue));
    } else {
      setMinutes(1);
      setInitialMinutes(1);
    }
  };

  const changePomoSeries = () => {
    const storageItem = localStorage.getItem(pomoSeriesItem);
    const currentSeries = Number(storageItem);

    !storageItem || currentSeries === maxSeriesCount
      ? localStorage.setItem(pomoSeriesItem, '0')
      : localStorage.setItem(pomoSeriesItem, String(currentSeries + 1));
  };

  const getCurrentRestMinutes = () => {
    const currentSeries = Number(localStorage.getItem(pomoSeriesItem));
    const restSettings = localStorage.getItem(pomoRestSettings);

    if (restSettings) {
      const { short, long } = JSON.parse(restSettings);
      return currentSeries === maxSeriesCount ? long : short;
    }

    return currentSeries === maxSeriesCount
      ? defaultLongRestMinutes
      : defaultRestMinutes;
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
    changePomoSeries,
    seconds,
    minutes,
    option,
  };
};
