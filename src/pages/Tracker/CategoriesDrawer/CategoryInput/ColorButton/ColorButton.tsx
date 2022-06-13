import React from 'react';
import colors, { transparentColors } from 'styles/colors';
import { Color } from '../CategoryInput.styles';
import IconButton from 'components/IconButton/IconButton';

type Props = {
  color: string;
  onClick?: VoidFunction | ((e: any) => void);
};

const ColorButton: React.FC<Props> = ({ color, onClick = undefined }) => {
  return (
    <IconButton
      backgroundColor={transparentColors.white[0.8]}
      squareSide={'40px'}
      paddings={'8px'}
      hoverColor={colors.white}
      onClick={onClick}
    >
      <Color color={color} />
    </IconButton>
  );
};

export default ColorButton;
