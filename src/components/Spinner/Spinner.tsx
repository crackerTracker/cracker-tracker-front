import * as React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';
import { SpinnerCircularFixedProps } from 'spinners-react/lib/esm/SpinnerCircularFixed';
import {
  spinnerSizes,
  SpinnerSizesEnum,
  spinnerThemesColors,
  SpinnerThemesEnum,
} from './config';

type Props = Omit<
  SpinnerCircularFixedProps,
  'size' | 'thickness' | 'color' | 'secondaryColor'
> & {
  theme?: SpinnerThemesEnum;
  size?: SpinnerSizesEnum;
};

const Spinner: React.FC<Props> = ({
  size = SpinnerSizesEnum.xs,
  theme = SpinnerThemesEnum.brown,
  speed = 150,
  ...rest
}) => {
  return (
    <SpinnerCircularFixed
      size={spinnerSizes[size].size}
      thickness={spinnerSizes[size].thickness}
      color={spinnerThemesColors[theme].color}
      secondaryColor={spinnerThemesColors[theme].secondaryColor}
      speed={speed}
      {...rest}
    />
  );
};

export default React.memo(Spinner);
