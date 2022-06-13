import styled from 'styled-components';
import { square } from 'styles/mixins';

export const Color = styled.div<{ color: string }>`
  ${square('100%')};
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;
