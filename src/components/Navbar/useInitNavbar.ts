import { useNavbarStore } from 'stores/hooks';
import { useNavigate } from 'react-router-dom';
import { MainRoutesEnum } from 'config/routes';
import { RoutesButtonConfigType } from 'stores/NavbarStore/types';
import { useEffect, useMemo } from 'react';
import { mainRoutesIcons } from 'config/navbar';

const useInitNavbar = () => {
  const { setRoutesButtons } = useNavbarStore();
  const navigate = useNavigate();

  const routesButton = useMemo(
    () =>
      Object.entries(mainRoutesIcons).reduce(
        (routesButton: RoutesButtonConfigType[], [route, image]) => {
          routesButton.push({
            route: route as MainRoutesEnum,
            image: image,
            callback: () => navigate(`/${route}`),
          });
          return routesButton;
        },
        []
      ),
    []
  );

  useEffect(() => {
    setRoutesButtons(routesButton);
  }, []);
};

export default useInitNavbar;
