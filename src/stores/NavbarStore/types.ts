import { MainRoutesEnum, SectionEnumsType } from 'config/routes';

export type RoutesButtonConfigType = {
  route: MainRoutesEnum;
  image: string;
  callback: VoidFunction;
};

export type SectionButtonConfigType = {
  section: SectionEnumsType;
  image: string;
  callback: VoidFunction;
};
