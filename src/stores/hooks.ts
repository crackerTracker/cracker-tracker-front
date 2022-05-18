import { useContext } from 'react';
import { StoresContext } from './StoresProvider';

export const usePomodoroStore = () => useContext(StoresContext).pomodoroStore;

export const useTrackerStore = () => useContext(StoresContext).trackerStore;

export const useAuthStore = () => useContext(StoresContext).authStore;

export const useNavbarStore = () => useContext(StoresContext).navbarStore;
