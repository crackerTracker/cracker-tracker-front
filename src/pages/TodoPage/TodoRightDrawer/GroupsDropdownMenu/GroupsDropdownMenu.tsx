import React, { useState, FormEvent, useCallback } from 'react';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { useTodoStore } from 'stores/hooks';
import { TodoGroupType } from 'stores/TodoStore/types';
import {
  GroupMenu,
  GroupMenuFooter,
  GroupMenuHeader,
  GroupMenuItem,
  GroupsWrapper,
  NoGroupsMessage,
  StyledInput,
} from './GroupsDropdownMenu.styles';

type Props = {
  groups: TodoGroupType[];
  addToGroup: (_id: string) => void;
};

const GroupsDropdownMenu = ({ groups, addToGroup }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const { createGroup, getLastAddedGroup } = useTodoStore();

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const addGroupHandler = async () => {
    if (!inputValue) return;

    await createGroup(inputValue);
    await addToGroup(getLastAddedGroup()._id);
    setInputValue('');
  };

  return (
    <GroupMenu>
      <GroupMenuHeader>Выбор группы</GroupMenuHeader>

      <GroupsWrapper>
        {!!groups.length &&
          groups.map(({ _id, name }) => (
            <GroupMenuItem key={_id} onClick={() => addToGroup(_id)}>
              {name}
            </GroupMenuItem>
          ))}
        {!groups.length && (
          <NoGroupsMessage>Не создано ни одной группы</NoGroupsMessage>
        )}
      </GroupsWrapper>

      <GroupMenuFooter size="small">
        <IconButton
          image={images.plusBrown.default}
          squareSide="25px"
          onClick={addGroupHandler}
          paddings="0"
        />
        <StyledInput
          bordered={false}
          placeholder="Создать группу"
          value={inputValue}
          onChange={onInputChange}
          onPressEnter={addGroupHandler}
        />
      </GroupMenuFooter>
    </GroupMenu>
  );
};

export default GroupsDropdownMenu;
