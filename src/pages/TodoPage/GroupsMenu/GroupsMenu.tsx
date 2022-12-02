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
  StyledIconButton,
} from './GroupsMenu.styles';
import { MainRoutesEnum } from 'config/routes';
import { observer } from 'mobx-react-lite';
import {
  getGroupNameInputStatus,
  handleGroupNameInputError,
  isGroupNameInputStatusNotOk,
} from '../TodoPage.utils';
import { TodoNavigateEnum } from 'config/todo';

const GroupsMenu: FC = () => {
  const { groups, createGroup, deleteGroup } = useTodoStore();

  const [inputValue, setInputValue] = useState('');

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
          const encodedGroupName = encodeURIComponent(name);
          const groupPageLink = `/${MainRoutesEnum.todo}/${TodoNavigateEnum.group}/${encodedGroupName}`;

          return (
            <GroupItemWrapper to={groupPageLink} key={_id}>
              <GroupItem>{name}</GroupItem>
              <StyledIconButton
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
            // red borders are not displayed when bordered === false
            bordered={isGroupNameInputStatusNotOk(inputValue)}
            placeholder="Создать группу"
            value={inputValue}
            onChange={onInputChange}
            onPressEnter={addGroupHandler}
            status={getGroupNameInputStatus(inputValue)}
          />
        </InputGroup>
      </ContentBlock>
    </GroupsWrapper>
  );
};

export default observer(GroupsMenu);
