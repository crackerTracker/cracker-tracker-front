import React, { FC, FormEvent } from 'react';

import { StyledButton } from './Button.styles';

export type StyledButtonProps = {
  margin?: string;
  bgCol?: string;
  minWidth?: string;
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  styles?: StyledButtonProps;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  styles,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={isLoading || isDisabled}
      {...styles}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
