import React, { FC, FormEvent, useCallback, useState } from 'react';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import { useTodoStore } from 'stores/hooks';
import {
  GroupsWrapper,
  GroupsHeader,
  StyledInput,
  ContentBlock,
  GroupItem,
  InputGroup,
  GroupItemWrapper,
} from './GroupsMenu.styles';
import { MainRoutesEnum } from 'config/routes';

const GroupsMenu: FC = () => {
  const { groups, createGroup, deleteGroup } = useTodoStore();

  const [inputValue, setInputValue] = useState('');

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const addGroupHandler = async () => {
    if (!inputValue) return;

    await createGroup(inputValue);
    setInputValue('');
  };

  const deleteGroupHandler = (groupId: string) => async (e: MouseEvent) => {
    e.preventDefault();
    await deleteGroup(groupId);
  };

  return (
    <GroupsWrapper>
      <GroupsHeader>Группы</GroupsHeader>

      <ContentBlock>
        {groups.map(({ name, _id }) => {
          return (
            <GroupItemWrapper
              to={`/${MainRoutesEnum.todo}/group/${name}`}
              key={_id}
            >
              <GroupItem>{name}</GroupItem>
              <IconButton
                image={images.deletePeach.default}
                squareSide="20px"
                paddings="0"
                onClick={deleteGroupHandler(_id)}
              />
            </GroupItemWrapper>
          );
        })}

        <InputGroup>
          <IconButton
            image={images.plusBrown.default}
            squareSide="35px"
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
        </InputGroup>
      </ContentBlock>
    </GroupsWrapper>
  );
};

export default GroupsMenu;
