import React, { useState, FormEvent, useCallback, useMemo } from 'react';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { useTodoStore } from 'stores/hooks';
import { TodoGroupType } from 'stores/TodoStore/types';
import {
  GroupMenu,
  GroupMenuFooter,
  GroupMenuHeader,
  GroupMenuItem,
  GroupName,
  GroupsWrapper,
  NoGroupsMessage,
  StyledInput,
} from './GroupsDropdownMenu.styles';
import {
  getGroupNameInputStatus,
  handleGroupNameInputError,
  isGroupNameInputStatusNotOk,
} from 'pages/TodoPage/TodoPage.utils';

type Props = {
  groups: TodoGroupType[];
  addToGroup: (_id: string) => Promise<void>;
  todoId: string;
  setIsOpen: (isOpen: boolean) => void;
};

const GroupsDropdownMenu = ({
  groups,
  addToGroup,
  todoId,
  setIsOpen,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const { createGroup, getLastAddedGroup, deleteFromGroup, findTodoById } =
    useTodoStore();

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const addGroupHandler = async () => {
    if (!inputValue) return;

    if (isGroupNameInputStatusNotOk(inputValue)) {
      handleGroupNameInputError(inputValue);
      return;
    }

    await createGroup(inputValue);
    await addToGroup(getLastAddedGroup()._id);
    setInputValue('');
  };

  const closeDropdownMenu = useCallback(() => setIsOpen(false), []);

  const todoGroupId = findTodoById(todoId)?.group?._id;

  const groupItems = useMemo(
    () =>
      groups.map(({ _id, name }) => {
        // if selected todo is in that group
        const isSelectedGroup = todoGroupId === _id;

        const clickHandler = isSelectedGroup
          ? closeDropdownMenu
          : () => addToGroup(_id);

        return (
          <GroupMenuItem key={_id} eventKey={_id} onClick={clickHandler}>
            <GroupName isSelected={isSelectedGroup}>{name}</GroupName>
            {isSelectedGroup && (
              <IconButton
                image={images.closeBrown.default}
                squareSide="15px"
                paddings="0"
                onClick={() => deleteFromGroup(todoId)}
              />
            )}
          </GroupMenuItem>
        );
      }),
    [groups, todoGroupId]
  );

  return (
    <GroupMenu>
      <GroupMenuHeader>Выбор группы</GroupMenuHeader>

      <GroupsWrapper>
        {!!groups.length && groupItems}
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
          // red borders are not displayed when bordered === false
          bordered={isGroupNameInputStatusNotOk(inputValue)}
          placeholder="Создать группу"
          value={inputValue}
          onChange={onInputChange}
          onPressEnter={addGroupHandler}
          status={getGroupNameInputStatus(inputValue)}
        />
      </GroupMenuFooter>
    </GroupMenu>
  );
};

export default GroupsDropdownMenu;
