import { images } from 'img/icons';
import { MainRoutesEnum } from './routes';
import { TrackerSectionsEnum } from './tracker';

export const mainRoutesIcons: Record<MainRoutesEnum, string> = {
  [MainRoutesEnum.todo]: images.checkPeach.default,
  [MainRoutesEnum.pomodoro]: images.clockPeach.default,
  [MainRoutesEnum.tracker]: images.graphPeach.default,
};

export const trackerNavbarIcons: Record<TrackerSectionsEnum, string> = {
  [TrackerSectionsEnum.categories]: images.menuGrayishBlue.default,
  [TrackerSectionsEnum.charts]: images.graphGrayishBlue.default,
};
