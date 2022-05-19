import React, { memo } from 'react';
import { Color, Content, StyledListItem } from './Category.styles';
import { CategoryType } from 'stores/TrackerStore/types';
import { Dropdown, Menu } from 'antd';
import { useTrackerStore } from 'stores/hooks';

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
  const { name, color, isArchived, id } = category;
  const { deleteCategory, editCategory } = useTrackerStore();

  const onClickEdit = () => {
    setEditedCategory(category);
  };

  const onClickArchive = async () => {
    editCategory(id, {
      isArchived: !isArchived,
    });
  };

  const onClickDelete = async () => {
    await deleteCategory(id);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onClickEdit}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={onClickArchive}>
        {isArchived ? 'Разархивировать' : 'Архивировать'}
      </Menu.Item>
      <Menu.Item key="3" onClick={onClickDelete}>
        Удалить
      </Menu.Item>
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
