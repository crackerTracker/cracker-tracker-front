import React, { useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Transition, TransitionStatus } from 'react-transition-group';
import { TransitionWrapper } from './ColorPicker.styles';

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

type Props = {
  visible?: boolean;
  color: string;
  onChange?: (color: string) => void;
};

const ColorPicker: React.FC<Props> = ({
  visible = false,
  color,
  onChange = () => {},
}) => {
  const ref = useRef(null);

  return (
    <Transition
      in={visible}
      timeout={100}
      mountOnEnter
      unmountOnExit
      nodeRef={ref}
    >
      {(state: TransitionStatus) => (
        <TransitionWrapper ref={ref} style={transitionStyles[state]}>
          <HexColorPicker color={color} onChange={onChange} />
        </TransitionWrapper>
      )}
    </Transition>
  );
};

export default ColorPicker;
