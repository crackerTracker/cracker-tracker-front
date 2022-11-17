import { useAuthStore } from 'stores/hooks';
import React from 'react';
import { Menu } from 'antd';
import { useModal } from 'components/Modal';

const useSettingsButton = () => {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const onChangeDropdownVisible = React.useCallback((isVisible) => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const { logout } = useAuthStore();

  const logoutHandler = React.useCallback(() => {
    logout();
  }, []);

  const { openModal, closeModal, isModalOpen } = useModal();

  const modalHandler = React.useCallback(() => {
    openModal();
    setIsDropdownVisible(false);
  }, []);

  const menu = React.useMemo(
    () => (
      <Menu>
        <Menu.Item key="2" onClick={modalHandler}>
          Настройка помидора
        </Menu.Item>
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
    openModal,
    closeModal,
    isModalOpen,
  };
};

export default useSettingsButton;
