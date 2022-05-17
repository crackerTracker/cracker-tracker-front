import React from 'react';
import colors from 'styles/colors';
import IconButton from 'components/IconButton/IconButton';

type Props = {
  image: string;
};

const Button: React.FC<Props> = ({ image }) => {
  return (
    <IconButton
      image={image}
      backgroundColor={colors.white}
      squareSide={'40px'}
      hoverColor={colors.white}
    />
  );
};

export default Button;
