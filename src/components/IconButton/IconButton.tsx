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
  className?: string;
};

const IconButton = React.forwardRef<HTMLDivElement, Props>(
  (
    {
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
      className = '',
    },
    ref
  ) => {
    return (
      <StyledButton
        onClick={isLoading || isDisabled ? undefined : onClick}
        isDisabled={isDisabled}
        squareSide={squareSide}
        paddings={paddings}
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
        color={color}
        className={className}
        ref={ref}
      >
        {image ? <Image image={image} /> : children}
      </StyledButton>
    );
  }
);

// при React.forwardRef, видимо, теряется displayName
IconButton.displayName = 'IconButton';

export default memo(IconButton);
