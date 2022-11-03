import styled from 'styled-components';
import { animate, backgroundImageContain, square } from 'styles/mixins';
import { images } from 'img/icons';
import { Row } from 'antd';

export const AntRow = styled(Row)`
  ${animate('opacity')};
  opacity: 0.8;
  user-select: none;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
` as typeof Row;

export const UpArrow = styled.div<{ drowdownVisible?: boolean }>`
  ${square('17px')};
  ${backgroundImageContain(images.upArrowBrown.default)};
  ${animate('transform')};

  transform: rotate(
    ${({ drowdownVisible = false }) => (drowdownVisible ? '0deg' : '180deg')}
  );
`;
