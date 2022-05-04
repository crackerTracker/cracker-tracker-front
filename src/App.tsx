import React, { useEffect } from 'react';
import Router from 'pages/router';
import StoresProvider from './stores/StoresProvider';

import 'styles/styles.scss';
import { useAuthStore, usePomodoroStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { login, storageName, isAuthenticated, token } = useAuthStore();

  const pomoStore = usePomodoroStore();
  pomoStore.token = token || '';

  useEffect(() => {
    const storageData = localStorage.getItem(storageName);
    const data = JSON.parse(String(storageData));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login, storageName]);

  return (
    <StoresProvider>
      <Router isAuthenticated={isAuthenticated} />
    </StoresProvider>
  );
};

export default observer(App);
