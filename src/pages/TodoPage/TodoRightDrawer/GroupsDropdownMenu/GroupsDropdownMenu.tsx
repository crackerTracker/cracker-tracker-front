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
  GroupWithIcon,
  NoGroupsMessage,
  StyledInput,
} from './GroupsDropdownMenu.styles';

type Props = {
  groups: TodoGroupType[];
  addToGroup: (_id: string) => void;
  todoId: string;
};

const GroupsDropdownMenu = ({ groups, addToGroup, todoId }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const { createGroup, getLastAddedGroup, deleteFromGroup, findTodoById } =
    useTodoStore();

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const addGroupHandler = async () => {
    if (!inputValue) return;

    await createGroup(inputValue);
    await addToGroup(getLastAddedGroup()._id);
    setInputValue('');
  };

  const todoGroupId = findTodoById(todoId)?.group?._id;

  const groupItems = groups.map(({ _id, name }) =>
    todoGroupId === _id ? (
      <GroupMenuItem key={_id}>
        <GroupWithIcon>
          <span>{name}</span>
          <IconButton
            image={images.closeBrown.default}
            squareSide="15px"
            paddings="0"
            onClick={() => deleteFromGroup(todoId)}
          />
        </GroupWithIcon>
      </GroupMenuItem>
    ) : (
      <GroupMenuItem key={_id} onClick={() => addToGroup(_id)}>
        {name}
      </GroupMenuItem>
    )
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
