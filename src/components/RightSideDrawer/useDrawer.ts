import { useState } from 'react';

const useDrawer = () => {
  const [visible, setVisible] = useState(false);

  const onDrawerClose = () => {
    setVisible(false);
  };

  return { visible, setVisible, onDrawerClose };
};

export default useDrawer;
