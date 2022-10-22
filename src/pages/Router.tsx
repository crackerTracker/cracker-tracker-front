import React, { memo } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth/Auth';
import Navbar from 'components/Navbar';
import { MainRoutesEnum } from 'config/routes';
import PomodoroPage from './PomodoroPage';
import Tracker from './Tracker';
import TodoPage from './TodoPage';
import TodoWeek from './TodoPage/TodoWeek';
import TodoAll from './TodoPage/TodoAll';

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
            <Route path={MainRoutesEnum.todo} element={<TodoPage />}>
              <Route index element={<TodoAll />} />
              <Route path="week" element={<TodoWeek />} />
            </Route>
            <Route path="*" element={<Navigate to="/todo" replace />} />
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
