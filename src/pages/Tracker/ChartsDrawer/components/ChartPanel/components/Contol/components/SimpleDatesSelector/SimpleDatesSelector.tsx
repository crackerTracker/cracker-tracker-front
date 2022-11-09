import * as React from 'react';
import { Dropdown, Space } from 'antd';

import { AntRow, UpArrow } from './SimpleDatesSelector.styles';
import { DatesTitle } from '../ui';
import {
  SimpleDatesEnum,
  simpleDatesTexts,
} from 'pages/Tracker/ChartsDrawer/config';

type Props = {
  // Колбэк, вызывав который, получаем antd-компонент Menu с Menu.Item'ами внутри
  optionsGetter: (closeDropdownCallback: VoidFunction) => React.ReactElement;
  selected: SimpleDatesEnum;
};

const SimpleDatesSelector: React.FC<Props> = ({ optionsGetter, selected }) => {
  const [visible, setVisible] = React.useState(false);

  const closeDropdown = React.useCallback(() => setVisible(false), []);

  const options = React.useMemo(
    () => optionsGetter(closeDropdown),
    [optionsGetter, closeDropdown]
  );

  return (
    <Dropdown
      overlay={options}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <AntRow align="middle">
        <Space>
          <DatesTitle>{simpleDatesTexts[selected]}</DatesTitle>
          <UpArrow drowdownVisible={visible} />
        </Space>
      </AntRow>
    </Dropdown>
  );
};

export default React.memo(SimpleDatesSelector);
