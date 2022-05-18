import React, { memo } from 'react';
import { Color, Content, StyledListItem } from './Category.styles';
import { CategoryType } from 'stores/TrackerStore/types';
import { Dropdown, Menu } from 'antd';

type Props = {
  category: CategoryType;
  isEdited: boolean;
  setEditedCategory: React.Dispatch<CategoryType | null>;
};

const Category: React.FC<Props> = ({
  category,
  isEdited,
  setEditedCategory,
}) => {
  const { name, color, isArchived } = category;

  const onClickEdit = () => {
    setEditedCategory(category);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onClickEdit}>
        Редактировать
      </Menu.Item>
      {/* todo реализовать архивацию */}
      <Menu.Item key="2">
        {isArchived ? 'Разархивировать' : 'Архивировать'}
      </Menu.Item>
      {/* todo реализовать удаление */}
      <Menu.Item key="3">Удалить</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={isEdited}>
      {/* workaround: div for react don't throw error */}
      <div>
        <StyledListItem $isEdited={isEdited}>
          <Content>
            <Color color={color} isEdited={isEdited} />
            {name}
          </Content>
        </StyledListItem>
      </div>
    </Dropdown>
  );
};

export default memo(Category);
