import React, { memo } from 'react';
import colors from 'styles/colors';
import IconButton, { IconButtonProps } from 'components/IconButton';

type Props = {
  image: string;
} & Pick<IconButtonProps, 'isLoading' | 'onClick' | 'isDisabled'>;

const Button: React.FC<Props> = ({
  image,
  onClick = undefined,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <IconButton
      image={image}
      backgroundColor={colors.white}
      squareSide={'40px'}
      hoverColor={colors.white}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};

export default memo(Button);
