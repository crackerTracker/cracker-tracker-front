import InfoModalStore from './InfoModalStore';
import { createContext, useContext } from 'react';

export const InfoModalStoreContext = createContext<InfoModalStore>(
  new InfoModalStore()
);

export const useInfoModalStoreContext = () => useContext(InfoModalStoreContext);
