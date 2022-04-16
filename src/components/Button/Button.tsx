import React, { FC, FormEvent } from 'react';

import { StyledButton } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  isLoading,
  isDisabled,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={isLoading || isDisabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
