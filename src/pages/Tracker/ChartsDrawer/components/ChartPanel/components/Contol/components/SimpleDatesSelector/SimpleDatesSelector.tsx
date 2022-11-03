import * as React from 'react';
import { Dropdown, Space } from 'antd';

import { AntRow, UpArrow } from './SimpleDatesSelector.styles';
import { DatesTitle } from '../ui';

type Props = {
  // Returns menu antd component with Menu.Items as children
  options: (closeDropdownCallback: VoidFunction) => React.ReactElement;
};

const SimpleDatesSelector: React.FC<Props> = ({ options }) => {
  const [visible, setVisible] = React.useState(false);

  const closeDropdown = React.useCallback(() => setVisible(false), []);

  return (
    <Dropdown
      overlay={options(closeDropdown)}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <AntRow align="middle">
        <Space>
          {/* todo изменять значение */}
          <DatesTitle>За последние 30 дней</DatesTitle>
          <UpArrow drowdownVisible={visible} />
        </Space>
      </AntRow>
    </Dropdown>
  );
};

export default React.memo(SimpleDatesSelector);
