import React, { createContext } from 'react';
import RootStore from './RootStore';
import rootStore from './index';

export const StoresContext = createContext<RootStore>(rootStore);

const StoresProvider: React.FC = ({ children }) => (
  <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>
);

export default StoresProvider;
