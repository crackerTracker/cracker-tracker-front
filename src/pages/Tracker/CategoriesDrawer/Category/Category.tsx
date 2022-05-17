import React from 'react';
import { Color, Content, StyledListItem } from './Category.styles';
import { CategoryType } from 'stores/TrackerStore/types';
import { Dropdown, Menu } from 'antd';

type Props = {
  category: CategoryType;
};

// todo подумать над вынесением дублируещегося кода
const Category: React.FC<Props> = ({ category }) => {
  const { name, color } = category;

  const onClickEdit = () => {};

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onClickEdit}>
        Редактировать
      </Menu.Item>
      {/* todo реализовать архивацию */}
      <Menu.Item key="2">Архивировать</Menu.Item>
      {/* todo реализовать удаление */}
      <Menu.Item key="3">Удалить</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      {/* workaround: div for react don't throw error */}
      <div>
        <StyledListItem>
          <Content>
            <Color color={color} />
            {name}
          </Content>
        </StyledListItem>
      </div>
    </Dropdown>
  );
};

export default Category;
