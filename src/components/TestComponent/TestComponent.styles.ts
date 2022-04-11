import styled from 'styled-components';
import { square } from 'styles/mixins';

export const Text = styled.div<{ backgroundColor?: string }>`
  color: red;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'blue'};

  ${square('200px')}
`;
