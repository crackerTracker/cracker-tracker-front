import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import { TaskType } from 'stores/TrackerStore/types';
import {
  Buttons,
  Color,
  Content,
  EditContainer,
  StyledInput,
  StyledListItem,
} from './ListItem.styles';
import { Dropdown, List, Menu, Select } from 'antd';
import { useTrackerStore } from 'stores/hooks';
import { InputStatusesEnum } from 'types/antd';
import useTimeTrackingInput from 'utils/hooks/useTimeTrackingInput';
import timeValidator from 'utils/timeValidator';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import colors from 'styles/colors';

enum listItemStatesEnum {
  initial = 'initial',
  edit = 'edit',
}

type Props = {
  task: TaskType;
};

const ListItem: React.FC<Props> = ({ task }) => {
  const { category, minutesSpent } = task;
  const { name, color } = category;
  const { arrayActiveCategoriesToSelect } = useTrackerStore();
  const [state, setState] = useState(listItemStatesEnum.initial);
  const [selectedCategory, setSelectedCategory] = useState(category.name);

  const timeSpent = useMemo(
    () => getMinsAndHoursStringFromMins(minutesSpent),
    [minutesSpent]
  );

  const { time, timeError, setTimeError, onChangeTime } =
    useTimeTrackingInput(timeSpent);

  const editContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state === listItemStatesEnum.initial) {
      return;
    }

    const clickHandler = (e: MouseEvent) => {
      if (
        editContainer.current &&
        !editContainer.current.contains(e.target as Node) &&
        //@ts-ignore
        !e.target?.['categoryDropdownWasClicked']
      ) {
        setState(listItemStatesEnum.initial); // todo сюда вставить обнуление
      }
    };

    // timeout to do not handle click on edit button in dropdown
    setTimeout(() => {
      document.addEventListener('click', clickHandler);
    });

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [state]);

  const onClickEdit = () => {
    setState(listItemStatesEnum.edit);
  };

  const onChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const onClickCancel = () => {
    setState(listItemStatesEnum.initial);
    // todo сюда вставить обнуление
  };

  const onClickApprove = () => {
    if (!timeValidator(time.trim())) {
      setTimeError(true);
      return;
    }

    // todo вставить обнуление, сохранение данных
    setState(listItemStatesEnum.initial);
  };

  const onClickSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    e.target['categoryDropdownWasClicked'] = true;
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onClickEdit}>
        Редактировать
      </Menu.Item>
      {/* todo реализовать удаление */}
      <Menu.Item key="2">Удалить</Menu.Item>
    </Menu>
  );

  return state === listItemStatesEnum.initial ? (
    <Dropdown overlay={menu} trigger={['click']}>
      {/* workaround: div for react don't throw error */}
      <div>
        <StyledListItem extra={<div>{timeSpent}</div>}>
          <Content>
            <Color color={color} />
            {name}
          </Content>
        </StyledListItem>
      </div>
    </Dropdown>
  ) : (
    <List.Item>
      <EditContainer ref={editContainer}>
        <Select
          size="middle"
          options={arrayActiveCategoriesToSelect}
          value={selectedCategory}
          style={{ width: '120px', marginRight: '10px', flexGrow: 1 }}
          onChange={onChangeCategory}
          onClick={onClickSelect}
        />
        <StyledInput
          value={time}
          onChange={onChangeTime}
          status={timeError ? InputStatusesEnum.error : undefined}
        />
        <Buttons>
          <IconButton
            squareSide={'32px'}
            paddings={'7px'}
            image={images.checkWhite.default}
            backgroundColor={colors.green}
            onClick={onClickApprove}
          />
          <IconButton
            squareSide={'32px'}
            paddings={'7px'}
            image={images.crossWhite.default}
            backgroundColor={colors.red}
            onClick={onClickCancel}
          />
          <IconButton
            squareSide={'32px'}
            paddings={'7px'}
            image={images.deleteWhite.default}
            backgroundColor={colors.red}
          />
        </Buttons>
      </EditContainer>
    </List.Item>
  );
};

export default memo(ListItem);
