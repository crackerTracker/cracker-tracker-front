import { images } from 'img/icons';
import { MainRoutesEnum } from './routes';
import { TrackerSectionsEnum } from './tracker';

export const mainRoutesIcons: Record<MainRoutesEnum, string> = {
  [MainRoutesEnum.pomodoro]: images.checkPeach.default,
  [MainRoutesEnum.tracker]: images.graphPeach.default,
};

export const trackerNavbarIcons: Record<TrackerSectionsEnum, string> = {
  [TrackerSectionsEnum.categories]: images.menuGrayishBlue.default,
};
