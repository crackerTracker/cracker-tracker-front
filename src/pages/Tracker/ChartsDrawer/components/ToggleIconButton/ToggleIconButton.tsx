import * as React from 'react';
import { OpacityWrapper } from './ToggleIconButton.styles';
import IconButton, { IconButtonProps } from 'components/IconButton';

type Props = IconButtonProps & {
  isActive?: boolean;
};

const ToggleIconButton: React.FC<Props> = ({ isActive, ...rest }) => {
  return (
    <OpacityWrapper isActive={isActive}>
      <IconButton {...rest} />
    </OpacityWrapper>
  );
};

export default React.memo(ToggleIconButton);
