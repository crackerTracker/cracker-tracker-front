import { Col, Dropdown, Menu, Row } from 'antd';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { usePomodoroStore } from 'stores/hooks';
import { PlannedPomoType } from 'stores/PomodoroStore';
import {
  InputGroup,
  StyledButton,
  StyledInput,
  StyledInputNumber,
} from './PlannedPomoItem.style';
import { PlannedPomoStore } from './PlannedPomoStore';

type Props = {
  plannedPomo: PlannedPomoType;
};

const PlannedPomoItem: FC<Props> = ({
  plannedPomo: { id, name, pomodorosAmount },
}) => {
  const pomodoroStore = usePomodoroStore();

  const plannedPomoStore = useLocalObservable(
    () => new PlannedPomoStore(pomodoroStore, { id, name, pomodorosAmount })
  );

  const {
    pomoName,
    pomoAmount,
    isEdit,
    isSetDisabled,
    menuAddPomo,
    menuMarkDone,
    menuDeletePomo,
    deletePomoStack,
    setPomoAmount,
    approveEditing,
    changeHandler,
    menuEditClick,
    cancelChanges,
  } = plannedPomoStore;

  const { plannedPomosData } = pomodoroStore;

  useEffect(() => {
    const firstPomo = plannedPomosData[0];
    const lastPomo = plannedPomosData[plannedPomosData.length - 1];
    // to refresh first pomo amount when timer is over
    if (id === firstPomo.id) {
      setPomoAmount(firstPomo.pomodorosAmount);
    }
    // to refresh last pomo amount when adding pomo with the same name
    if (id === lastPomo.id) {
      setPomoAmount(lastPomo.pomodorosAmount);
    }
  }, [plannedPomosData, id]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={menuEditClick} disabled={isSetDisabled}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="2" onClick={menuMarkDone} disabled={isSetDisabled}>
        Отметить выполненным
      </Menu.Item>
      <Menu.Item key="3" onClick={menuAddPomo}>
        Прибавить помидор
      </Menu.Item>
      <Menu.Item key="4" onClick={menuDeletePomo} disabled={pomoAmount <= 1}>
        Убавить помидор
      </Menu.Item>
      <Menu.Item key="5" onClick={deletePomoStack} disabled={isSetDisabled}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <InputGroup compact isDisabled={!isEdit}>
        <Row>
          <Col flex="0 1 auto">
            <StyledInputNumber
              min={1}
              disabled={!isEdit}
              bordered={false}
              value={pomoAmount}
              onChange={setPomoAmount}
            />
          </Col>

          <Col flex="1 1 auto">
            <StyledInput
              value={pomoName}
              bordered={false}
              disabled={!isEdit}
              onChange={changeHandler}
              placeholder="Без названия"
            />
          </Col>

          <Col flex="0 1 auto">
            {!isEdit && (
              <Dropdown overlay={menu} trigger={['click']}>
                <StyledButton type="text">&#8226;&#8226;&#8226;</StyledButton>
              </Dropdown>
            )}

            {isEdit && (
              <>
                <StyledButton type="text" onClick={cancelChanges}>
                  &times;
                </StyledButton>
                <StyledButton type="text" onClick={approveEditing}>
                  &#10003;
                </StyledButton>
              </>
            )}
          </Col>
        </Row>
      </InputGroup>
    </>
  );
};

export default observer(PlannedPomoItem);
