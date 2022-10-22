import * as React from 'react';
import RightSideDrawer, {
  RightSideDrawerProps,
} from 'components/RightSideDrawer';

type Props = Pick<RightSideDrawerProps, 'visible' | 'onDrawerClose'>;

const ChartsDrawer: React.FC<Props> = ({ onDrawerClose, visible }) => {
  return (
    <RightSideDrawer
      visible={visible}
      onDrawerClose={onDrawerClose}
      headerTitle={'Статистика'}
    >
      blablabla
    </RightSideDrawer>
  );
};

export default ChartsDrawer;
