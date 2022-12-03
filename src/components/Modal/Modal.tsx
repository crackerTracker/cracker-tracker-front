import React, { FC, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { images } from 'img/icons';
import {
  Background,
  Container,
  Content,
  ModalTransitionStyle,
  Header,
  StyledIconButton,
  Title,
} from './Modal.styles';

export type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  title?: string;
  footer?: JSX.Element;
  width?: string;
  height?: string;
};

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  footer,
  width = '844px',
  height = '625px',
}) => {
  const nodeRef = useRef(null);

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', keydownHandler);
    return () => document.body.removeEventListener('keydown', keydownHandler);
  }, [keydownHandler]);

  return (
    <>
      <ModalTransitionStyle />

      <CSSTransition
        timeout={200}
        mountOnEnter
        unmountOnExit
        in={isOpen}
        nodeRef={nodeRef}
        classNames="modal-transition"
      >
        <div ref={nodeRef}>
          <Container width={width} height={height} className="modal-container">
            <Header>
              <Title>{title}</Title>
              <StyledIconButton
                image={images.closeBrown.default}
                onClick={onClose}
                squareSide="35px"
                paddings="0"
              />
            </Header>

            <Content>{children}</Content>

            <footer>{footer}</footer>
          </Container>

          <Background onClick={onClose} className="modal-background" />
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
