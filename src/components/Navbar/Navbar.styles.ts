import styled, { css } from 'styled-components';
import colors from 'styles/colors';
import {
  animate,
  backgroundImageContain,
  flex,
  scroller,
  square,
} from 'styles/mixins';
import { images } from 'img/common';
import { Divider } from 'antd';

export const MainPart = styled.div`
  ${flex({ direction: 'column', align: 'center' })}
`;

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;

  background-color: ${colors.peach};

  padding: 45px 15px 110px;

  ${flex({ direction: 'column', align: 'center' })};
`;

export const Logo = styled.div`
  ${square('65px')};
  ${backgroundImageContain(images.logo)};
  margin-bottom: 60px;
`;

export const Buttons = styled.div`
  ${flex({ direction: 'column', justify: 'space-between' })};

  & > * {
    margin-bottom: 30px;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const MainButtonWrapper = styled.div<{ active?: boolean }>`
  position: relative;

  opacity: ${({ active }) => (active ? 1 : 0.3)};

  ${animate('opacity')};

  &:hover {
    ${({ active }) =>
      !active &&
      css`
        opacity: 0.6;
      `}

    ${({ active }) =>
      active &&
      css`
        &::before {
          height: 35px;
        }
      `}
  }

  &::before {
    content: '';
    position: absolute;
    background-color: ${colors.darkBrown};
    border-radius: 4px;

    right: -12px;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    ${({ active }) =>
      active
        ? css`
            height: 25px;
          `
        : css`
            height: 5px;
            opacity: 0;
          `}

    width: 5px;

    pointer-events: none;

    ${animate('height', 'opacity')};
  }
`;

export const StyledDivider = styled(Divider).attrs({
  type: 'horizontal',
})`
  margin: 50px 0;
  background-color: ${colors.grayishBlue};
  opacity: 0.5;
`;

export const ScrollContainer = styled.div`
  max-height: 100%;
  overflow: auto;
  ${scroller};
`;

export const ExtraButtonWrapper = styled.div<{ active?: boolean }>`
  position: relative;

  opacity: ${({ active }) => (active ? 1 : 0.6)};

  ${animate('opacity')};

  &:hover {
    &::before {
      opacity: ${({ active }) => (active ? 0.3 : 0.1)};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    ${square('100%')};
    background-color: ${colors.grayishBlue};
    border-radius: 4px;

    pointer-events: none;

    opacity: ${({ active }) => (active ? 0.2 : 0)};

    ${animate('opacity')};
  }
`;
