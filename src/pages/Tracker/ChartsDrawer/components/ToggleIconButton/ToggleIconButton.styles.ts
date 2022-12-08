import styled from 'styled-components';

export const OpacityWrapper = styled.div<{ isActive?: boolean }>`
  opacity: ${({ isActive = false }) => (isActive ? 1 : 0.7)};
`;
