import React from 'react';
import colors, { transparentColors } from 'styles/colors';
import { Color } from '../CategoryInput.styles';
import IconButton, { IconButtonProps } from 'components/IconButton/IconButton';

type Props = {
  color: string;
} & Pick<IconButtonProps, 'isDisabled' | 'onClick'>;

const ColorButton: React.FC<Props> = ({
  color,
  onClick = undefined,
  isDisabled = false,
}) => {
  return (
    <IconButton
      backgroundColor={transparentColors.white[0.8]}
      squareSide={'40px'}
      paddings={'8px'}
      hoverColor={colors.white}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <Color color={color} />
    </IconButton>
  );
};

export default ColorButton;
