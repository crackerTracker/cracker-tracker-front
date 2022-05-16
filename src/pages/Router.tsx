import React, { memo } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Test from './Test';
import Auth from './Auth/Auth';
import Test2 from './Test2';
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
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path={MainRoutesEnum.pomodoro} element={<PomodoroPage />} />
            <Route path={MainRoutesEnum.tracker} element={<Tracker />} />
            <Route path={MainRoutesEnum.todo} element={<TodoPage />}>
              <Route index element={<TodoAll />} />
              <Route path="week" element={<TodoWeek />} />
            </Route>
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
