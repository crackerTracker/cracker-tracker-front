import { DatesSelectionTypesEnum } from '../../../types';

export type DatesStringSelectionType =
  | {
      selectionType: DatesSelectionTypesEnum.single;
      value: string;
    }
  | {
      selectionType: DatesSelectionTypesEnum.range;
      value: [string, string];
    };
