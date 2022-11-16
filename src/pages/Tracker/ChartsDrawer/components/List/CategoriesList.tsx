import * as React from 'react';
import { List, Skeleton } from 'antd';

import { AntList, Color } from './CategoriesList.styles';
import { mockListCategories } from '../../mock';

const CategoriesList: React.FC = () => {
  return (
    <AntList
      dataSource={mockListCategories}
      renderItem={({ id, name, color, percentString }) => (
        <List.Item key={id} actions={[<>{percentString ?? ''}</>]}>
          <List.Item.Meta title={name} avatar={<Color color={color} />} />
        </List.Item>
      )}
    />
  );
};

export default React.memo(CategoriesList);
