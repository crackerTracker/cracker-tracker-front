import React, { memo } from 'react';
import { Image, StyledButton } from './IconButton.styles';

type Props = {
  children?: React.ReactNode;
  onClick?: VoidFunction | ((e: any) => void);
  isLoading?: boolean;
  isDisabled?: boolean;
  image?: string;
  squareSide?: string;
  paddings?: string;
  backgroundColor?: string;
  hoverColor?: string;
  color?: string;
};

const IconButton: React.FC<Props> = ({
  onClick = () => {},
  isLoading = false,
  isDisabled = false,
  children = undefined,
  image = undefined,
  squareSide = '50px',
  paddings = '10px',
  backgroundColor = 'transparent',
  hoverColor = undefined,
  color = 'black',
}) => {
  return (
    <StyledButton
      onClick={isLoading || isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
      squareSide={squareSide}
      paddings={paddings}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      color={color}
    >
      {image ? <Image image={image} /> : children}
    </StyledButton>
  );
};

export default memo(IconButton);
