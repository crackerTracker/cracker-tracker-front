import { PomodoroSectionsEnum } from './pomoconf';
import { TrackerSectionsEnum } from './tracker';

// todo добавить todo
export enum MainRoutesEnum {
  pomodoro = 'pomodoro',
  tracker = 'tracker',
}

// todo добавить todo
export type SectionEnumsType = TrackerSectionsEnum | PomodoroSectionsEnum;
