import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { mainRoutes, MainRoutesEnum } from 'config/routes';
import { useNavbarStore } from 'stores/hooks';

const useObserveURL = () => {
  const { setActiveRoute } = useNavbarStore();
  const { pathname } = useLocation();

  useEffect(() => {
    const firstPathname = pathname.split('/')[1];
    if (mainRoutes.includes(firstPathname)) {
      setActiveRoute(firstPathname as MainRoutesEnum);
    } else {
      setActiveRoute(null);
    }
  }, [pathname]);
};

export default useObserveURL;
