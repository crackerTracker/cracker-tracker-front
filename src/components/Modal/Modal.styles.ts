import styled, { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';
import { scroller, flex, animate } from 'styles/mixins';
import IconButton from 'components/IconButton';
import zIndexes from 'styles/z-indexes';

export const ModalTransitionStyle = createGlobalStyle`
    --scale-ratio: 1;
    --opacity-value: 1;

    .modal-transition-{
      &enter {
        --opacity-value: 0;
        --scale-ratio: 0.5;
      }
      &enter-active {
        --opacity-value: 1;
        --scale-ratio: 1;
      }
      &exit {
        --opacity-value: 1;
        --scale-ratio: 1;
      }
      &exit-active {
        --opacity-value: 0;
        --scale-ratio: 0.5;
      }
    }
    
    .modal-transition-{
      &enter, &enter-active, &exit, &exit-active {
        .modal-background, .modal-container {
          opacity: var(--opacity-value);
        }
        .modal-container {
          transform: scale(var(--scale-ratio)) translate3d(-50%, -50%, 0);
        }
      }
    }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: ${zIndexes.modalBackground};

  background-color: rgba(0, 0, 0, 0.5);

  ${animate('opacity')};
`;

export const Container = styled.div<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 45px;

  position: fixed;
  left: 50%;
  top: 50%;
  z-index: ${zIndexes.modalContainer};

  ${flex({ direction: 'column' })}

  background-color: ${colors.peach};
  border-radius: 16px;

  transform: scale(1) translate3d(-50%, -50%, 0);
  transition: transform 0.2s ease, opacity 0.2s ease;

  /* to make modal transform from center */
  transform-origin: left;
`;

export const Header = styled.div`
  margin-bottom: 25px;
  ${flex({ align: 'center', justify: 'space-between' })};
`;

export const Title = styled.h1`
  margin: 0 10px 0 0;

  font-size: 28px;
  line-height: 1.2;

  text-overflow: ellipsis;
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Content = styled.div`
  margin-right: -35px;
  padding-right: 35px;

  overflow-x: hidden;
  overflow-y: auto;

  flex: 1 1 auto;
  ${scroller};
`;

// to prevent close button shrinking
export const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
`;
