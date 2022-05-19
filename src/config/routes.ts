import { PomodoroSectionsEnum } from './pomoconf';
import { TrackerSectionsEnum } from './tracker';

// todo добавить todo
export enum MainRoutesEnum {
  pomodoro = 'pomodoro',
  tracker = 'tracker',
}

export const mainRoutes = Object.keys(MainRoutesEnum);

// todo добавить todo
export type SectionEnumsType = TrackerSectionsEnum | PomodoroSectionsEnum;
