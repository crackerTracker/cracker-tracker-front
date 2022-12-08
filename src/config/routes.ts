import { PomodoroSectionsEnum } from './pomoconf';
import { TodoSectionEnum } from './todo';
import { TrackerSectionsEnum } from './tracker';

export enum MainRoutesEnum {
  pomodoro = 'pomodoro',
  tracker = 'tracker',
  todo = 'todo',
}

export const mainRoutes = Object.keys(MainRoutesEnum);

export type SectionEnumsType =
  | TrackerSectionsEnum
  | PomodoroSectionsEnum
  | TodoSectionEnum;
