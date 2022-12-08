import { todoNavbarIcons } from 'config/navbar';
import { TodoSectionEnum } from 'config/todo';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavbarStore } from 'stores/hooks';
import useDrawer from 'utils/hooks/useDrawer';
import useInitSectionNavbar from 'utils/hooks/useInitSectionNavbar';

const useGroupsDrawer = () => {
  const location = useLocation();

  const { setActiveSection } = useNavbarStore();
  const { visible, onDrawerOpen, onDrawerClose } = useDrawer();

  const onDrawerOpenHandler = useCallback(() => {
    setActiveSection(TodoSectionEnum.groups);
    onDrawerOpen();
  }, []);

  const onDrawerCloseHandler = useCallback(() => {
    setActiveSection(null);
    onDrawerClose();
  }, []);

  const leftDrawerSectionCallback = visible
    ? onDrawerCloseHandler
    : onDrawerOpenHandler;

  useInitSectionNavbar<TodoSectionEnum>(todoNavbarIcons, {
    [TodoSectionEnum.groups]: leftDrawerSectionCallback,
  });

  // to close drawer on entering other page
  useEffect(() => {
    if (visible) {
      onDrawerCloseHandler();
    }
  }, [location.pathname]);

  return { visible, onDrawerCloseHandler };
};

export default useGroupsDrawer;
