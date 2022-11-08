import styled, { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';
import { scroller, flex, animate } from 'styles/mixins';
import IconButton from 'components/IconButton';

export const ModalTransitionStyle = createGlobalStyle`
    --scale-ratio: 1;
    --opacity-value: 1;

  .my-node-enter {
    --opacity-value: 0;
    --scale-ratio: 0.5;
  }
  .my-node-enter-active {
    --opacity-value: 1;
    --scale-ratio: 1;
  }
  .my-node-exit {
    --opacity-value: 1;
    --scale-ratio: 1;
  }
  .my-node-exit-active {
    --opacity-value: 0;
    --scale-ratio: 0.5;
  }

  .my-node-enter, .my-node-enter-active, .my-node-exit, .my-node-exit-active{
    .background, .modal{
      opacity: var(--opacity-value);
    }
    .modal{
      transform: scale(var(--scale-ratio)) translate3d(-50%, -50%, 0);
    }
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.5);

  ${animate('opacity')};
`;

export const Container = styled.div<{
  width?: string;
  height?: string;
}>`
  width: ${({ width }) => width || '844px'};
  height: ${({ height }) => height || '625px'};
  padding: 45px;

  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2;

  ${flex({ direction: 'column' })}

  background-color: ${colors.peach};
  border-radius: 16px;

  transform: scale(1) translate3d(-50%, -50%, 0);
  transition: transform 0.2s ease, opacity 0.2s ease;

  /* to make modal transform from center (maybe because of left: 50%) */
  transform-origin: left;
`;

export const Header = styled.div`
  margin-bottom: 25px;
  ${flex({ align: 'center', justify: 'space-between' })};
`;

export const Title = styled.h1`
  margin: 0;
  margin-right: 10px;

  font-size: 28px;
  line-height: 1.2;

  text-overflow: ellipsis;
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Content = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  ${scroller};
`;

// to prevent close button shrinking
export const StyledIconButton = styled(IconButton)<{ squareSide: string }>`
  min-width: ${({ squareSide }) => squareSide};
  min-height: ${({ squareSide }) => squareSide};
`;
