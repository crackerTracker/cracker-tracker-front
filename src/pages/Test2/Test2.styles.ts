import styled from 'styled-components';
import { images } from 'img/common';
import { square } from 'styles/mixins';

export const Image = styled.div<{ src?: string }>`
  ${square('200px')}
  background: url(${({ src }) =>
    src ? src : images.duck}) no-repeat center / contain;
`;
