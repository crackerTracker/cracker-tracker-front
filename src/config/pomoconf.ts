export const format = 'HH:mm';

export const defaultInitialMinutes = 50;

export const defaultRestMinutes = 5;
export const defaultLongRestMinutes = 15;

export const defaultPomoTime = 50;

// pomodoro series key name in local storage
export const pomoSeriesItem = 'pomoSeries';

// max count of pomodoro series before long break (count from 0)
export const maxSeriesCount = 3;

export const OptionsEnum = {
  1: '1 минута',
  5: '5 минут',
  10: '10 минут',
  20: '20 минут',
};

export enum PomodoroSectionsEnum {
  about = 'about',
}

export enum TimerStatesEnum {
  work = 'work',
  rest = 'rest',
  off = 'off',
}
