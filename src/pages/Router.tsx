import React, { memo } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth/Auth';
import Navbar from 'components/Navbar';
import { MainRoutesEnum } from 'config/routes';
import PomodoroPage from './PomodoroPage';
import Tracker from './Tracker';
import TodoPage from './TodoPage';

type Props = {
  isAuthenticated: boolean;
};

const Router: React.FC<Props> = ({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path={MainRoutesEnum.pomodoro} element={<PomodoroPage />} />
            <Route path={MainRoutesEnum.tracker} element={<Tracker />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="*" element={<Navigate to="/tracker" replace />} />
          </Routes>
        </>
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