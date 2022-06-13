import { useState } from 'react';

const useDrawer = () => {
  const [visible, setVisible] = useState(false);

  const onDrawerOpen = () => {
    setVisible(true);
  };

  const onDrawerClose = () => {
    setVisible(false);
  };

  return { visible, onDrawerOpen, onDrawerClose };
};

export default useDrawer;
