import { SpinnerCircularFixedProps } from 'spinners-react/lib/esm/SpinnerCircularFixed';
import colors, { halfOpacityColors } from 'styles/colors';

export enum SpinnerSizesEnum {
  xs = 'xs',
  l = 'l',
}

export enum SpinnerThemesEnum {
  brown = 'brown',
}

type SpinnerColorsTheme = {
  color: SpinnerCircularFixedProps['color'];
  secondaryColor: SpinnerCircularFixedProps['secondaryColor'];
};

type SpinnerSizeType = {
  size: SpinnerCircularFixedProps['size'];
  thickness: SpinnerCircularFixedProps['thickness'];
};

export const spinnerThemesColors: Record<
  SpinnerThemesEnum,
  SpinnerColorsTheme
> = {
  [SpinnerThemesEnum.brown]: {
    color: colors.brown,
    secondaryColor: halfOpacityColors.brown,
  },
};

export const spinnerSizes: Record<SpinnerSizesEnum, SpinnerSizeType> = {
  [SpinnerSizesEnum.l]: {
    size: 70,
    thickness: 150,
  },
  [SpinnerSizesEnum.xs]: {
    size: 24,
    thickness: 200,
  },
};
