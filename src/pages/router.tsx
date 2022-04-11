import React, { memo } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Test from './Test';
import Auth from './Auth/Auth';
import Test2 from './Test2';

type Props = {
  isAuthenticated: boolean;
};

const Router: React.FC<Props> = ({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="*" element={<Navigate to="/test" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default memo(Router);
