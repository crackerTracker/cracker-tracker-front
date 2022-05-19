import React, { memo } from 'react';
import colors from 'styles/colors';
import IconButton from 'components/IconButton/IconButton';

type Props = {
  image: string;
  onClick?: VoidFunction | ((e: any) => void);
};

const Button: React.FC<Props> = ({ image, onClick = undefined }) => {
  return (
    <IconButton
      image={image}
      backgroundColor={colors.white}
      squareSide={'40px'}
      hoverColor={colors.white}
      onClick={onClick}
    />
  );
};

export default memo(Button);
