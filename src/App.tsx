import React from 'react';
import Router from 'pages/router';
import StoresProvider from './stores/StoresProvider';

import 'styles/styles.scss';

const App = () => {
  const isAuthenticated = true;

  return (
    <StoresProvider>
      <Router isAuthenticated={isAuthenticated} />
    </StoresProvider>
  );
};

export default App;
