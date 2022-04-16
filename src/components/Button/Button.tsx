import React, { FC, FormEvent } from 'react';

import { StyledButton } from './Button.styles';

interface ButtonProps {
  text: string;
  onClick: (e: FormEvent<HTMLDivElement>) => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <>
      <StyledButton onClick={onClick}>
        <button>{text}</button>
      </StyledButton>
    </>
  );
};

export default Button;
