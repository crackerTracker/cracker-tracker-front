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
} from './GroupsMenu.styles';

const GroupsMenu: FC = () => {
  const { groups, createGroup } = useTodoStore();

  const [inputValue, setInputValue] = useState('');

  const onInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const addGroupHandler = async () => {
    if (!inputValue) return;

    await createGroup(inputValue);
    setInputValue('');
  };

  return (
    <GroupsWrapper>
      <GroupsHeader>Группы</GroupsHeader>

      <ContentBlock>
        {groups.map(({ name, _id }) => {
          return (
            <GroupItem key={_id} onClick={() => {}}>
              {name}
            </GroupItem>
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
