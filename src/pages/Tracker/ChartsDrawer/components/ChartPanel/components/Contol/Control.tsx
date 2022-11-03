import * as React from 'react';
import { Menu, Row } from 'antd';
import SimpleDatesSelector from './components/SimpleDatesSelector';
import { DatesTitle } from './components/ui';
import DatePicker from './components/DatePicker';
import { NoShrink } from './Control.styles';
import { Moment } from 'moment';

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

  const onPickDate = (date: Moment | null) => console.log(date);

  return (
    <Row justify="space-between">
      {/* todo добавить логику отображения либо селектора, либо одного заголовка */}
      {/*<DatesTitle>За последние 7 дней</DatesTitle>*/}
      <SimpleDatesSelector options={menu} />
      <NoShrink>
        <DatePicker onPick={onPickDate} />
      </NoShrink>
    </Row>
  );
};

export default React.memo(Control);
