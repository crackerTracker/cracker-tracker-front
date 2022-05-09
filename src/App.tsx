import React, { useEffect } from 'react';
import Router from 'pages/router';
import StoresProvider from './stores/StoresProvider';

import 'styles/styles.scss';
import { useAuthStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { isAuthenticated, initUser } = useAuthStore();

  useEffect(() => {
    initUser();
  }, []);

  return (
    <StoresProvider>
      <Router isAuthenticated={isAuthenticated} />
    </StoresProvider>
  );
};

export default observer(App);
