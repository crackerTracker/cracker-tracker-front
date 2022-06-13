import { PomodoroSectionsEnum } from './pomoconf';
import { TrackerSectionsEnum } from './tracker';

export enum MainRoutesEnum {
  pomodoro = 'pomodoro',
  tracker = 'tracker',
  todo = 'todo',
}

export const mainRoutes = Object.keys(MainRoutesEnum);

// todo добавить todo
export type SectionEnumsType = TrackerSectionsEnum | PomodoroSectionsEnum;
