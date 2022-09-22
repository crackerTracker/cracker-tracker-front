import { useAuthStore } from 'stores/hooks';
import React from 'react';
import { Menu } from 'antd';

const useSettingsButton = () => {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const onChangeDropdownVisible = React.useCallback((isVisible) => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const { logout } = useAuthStore();

  const logoutHandler = React.useCallback(() => {
    logout();
  }, []);

  const menu = React.useMemo(
    () => (
      <Menu>
        <Menu.Item key="1" onClick={logoutHandler}>
          Выйти
        </Menu.Item>
      </Menu>
    ),
    [logoutHandler]
  );

  return {
    isSettingsDropdownVisible: isDropdownVisible,
    onChangeSettingsDropdownVisible: onChangeDropdownVisible,
    settingButtonMenu: menu,
  };
};

export default useSettingsButton;
