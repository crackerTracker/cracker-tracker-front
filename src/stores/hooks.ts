import { useContext } from 'react';
import { StoresContext } from './StoresProvider';

export const useTestStore = () => useContext(StoresContext).testStore;

export const useTestStore2 = () => useContext(StoresContext).testStore2;

export const usePomodoroStore = () => useContext(StoresContext).pomodoroStore;

export const useTrackerStore = () => useContext(StoresContext).trackerStore;

export const useAuthStore = () => useContext(StoresContext).authStore;

export const useNavbarStore = () => useContext(StoresContext).navbarStore;
