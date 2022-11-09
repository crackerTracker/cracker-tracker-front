import styled from 'styled-components';
import { animate, backgroundImageContain, square } from 'styles/mixins';
import { images } from 'img/icons';
import { Row } from 'antd';

export const AntRow = styled(Row)`
  ${animate('opacity')};
  opacity: 1;
  user-select: none;

  // Равно длине самого широкого текста - для того,
  // чтобы выпдающее меню не скакало по ширине и было зафиксировано
  min-width: 225px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
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
