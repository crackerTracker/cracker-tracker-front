import React, { memo } from 'react';
import { Image, StyledButton } from './IconButton.styles';

type Props = {
  children?: React.ReactNode;
  onClick?: VoidFunction;
  isLoading?: boolean;
  isDisabled?: boolean;
  image?: string;
  squareSide?: string;
  backgroundColor?: string;
  color?: string;
};

const IconButton: React.FC<Props> = ({
  onClick = () => {},
  isLoading = false,
  isDisabled = false,
  children = undefined,
  image = undefined,
  squareSide = '50px',
  backgroundColor = 'transparent',
  color = 'black',
}) => {
  return (
    <StyledButton
      onClick={isLoading || isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
      squareSide={squareSide}
      backgroundColor={backgroundColor}
      color={color}
    >
      {image ? <Image image={image} /> : children}
    </StyledButton>
  );
};

export default memo(IconButton);
