import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { InputStatusesEnum, SelectOptionType } from 'types/antd';
import useTimeTrackingInput from 'utils/hooks/useTimeTrackingInput';
import timeValidator from 'utils/timeValidator';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import colors from 'styles/colors';
import { observer } from 'mobx-react-lite';
import convertSpentTimeStringToMins from 'utils/convertSpentTimeStringToMins';

enum listItemStatesEnum {
  initial = 'initial',
  edit = 'edit',
}

type Props = {
  task: TaskType;
};

const ListItem: React.FC<Props> = ({ task }) => {
  const { category, minutesSpent, id, timestamp } = task;
  const { arrayActiveCategoriesToSelect, deleteTask, editTask } =
    useTrackerStore();
  const [state, setState] = useState(listItemStatesEnum.initial);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<SelectOptionType>({ label: category.name, value: category.id });

  const timeSpent = useMemo(
    () => getMinsAndHoursStringFromMins(minutesSpent),
    [minutesSpent]
  );

  const { time, setTime, timeError, setTimeError, onChangeTime } =
    useTimeTrackingInput(timeSpent);

  const resetListItemEdition = () => {
    setState(listItemStatesEnum.initial);
    setSelectedCategoryOption({ label: category.name, value: category.id });
    setTime(timeSpent);
  };

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
        resetListItemEdition();
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

  const onClickDelete = async () => {
    await deleteTask(id, timestamp);
  };

  const onChangeCategory = (
    value: string,
    option: SelectOptionType | SelectOptionType[]
  ) => {
    setSelectedCategoryOption(Array.isArray(option) ? option[0] : option);
  };

  const onClickCancel = () => {
    resetListItemEdition();
  };

  const onClickApprove = async () => {
    if (!timeValidator(time.trim())) {
      setTimeError(true);
      return;
    }

    const result = await editTask(id, {
      categoryId: selectedCategoryOption.value,
      minutesSpent: convertSpentTimeStringToMins(time),
    });

    if (result) {
      resetListItemEdition();
    }
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
      <Menu.Item key="2" onClick={onClickDelete}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return state === listItemStatesEnum.initial ? (
    <Dropdown overlay={menu} trigger={['click']}>
      {/* workaround: div for react don't throw error */}
      <div>
        <StyledListItem extra={<div>{timeSpent}</div>}>
          <Content>
            <Color color={category.color} />
            {category.name}
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
          value={selectedCategoryOption.label}
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
            onClick={onClickDelete}
          />
        </Buttons>
      </EditContainer>
    </List.Item>
  );
};

export default observer(ListItem);
