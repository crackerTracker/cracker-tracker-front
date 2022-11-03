import * as React from 'react';
import { Menu, Row } from 'antd';
import TitleSelector from './components/SimpleDatesSelector';
import { DatesTitle } from './components/ui';

const Control: React.FC = () => {
  const menu = React.useCallback(
    (closeDropdownCallback: VoidFunction) => (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            console.log('Сегодня');
            closeDropdownCallback();
          }}
        >
          Сегодня
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            console.log('Вчера');
            closeDropdownCallback();
          }}
        >
          Вчера
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            console.log('Последние 7 дней');
            closeDropdownCallback();
          }}
        >
          Последние 7 дней
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            console.log('Последние 30 дней');
            closeDropdownCallback();
          }}
        >
          Последние 30 дней
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <Row>
      {/* todo добавить логику отображения либо селектора, либо одного заголовка */}
      {/*<DatesTitle>За последние 7 дней</DatesTitle>*/}
      <TitleSelector options={menu} />
    </Row>
  );
};

export default React.memo(Control);
