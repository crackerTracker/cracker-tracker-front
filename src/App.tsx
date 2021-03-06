import React, { useEffect } from 'react';
import Router from 'pages/Router';
import StoresProvider from 'stores/StoresProvider';

import 'styles/styles.scss';
import { useAuthStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/ru';

const App = () => {
  const { isAuthenticated, initUser } = useAuthStore();

  useEffect(() => {
    initUser();
  }, []);

  moment.locale('ru');

  return (
    <StoresProvider>
      <Router isAuthenticated={isAuthenticated} />
    </StoresProvider>
  );
};

export default observer(App);
