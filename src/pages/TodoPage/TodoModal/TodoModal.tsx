import { Col, ConfigProvider, Row } from 'antd';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import React, { FC, useEffect } from 'react';
import DrawerTodoCard from '../DrawerTodoCard';
import {
  StyledDatePicker,
  StyledTextArea,
} from '../TodoRightDrawer/TodoRightDrawer.styles';
import { ModalContent, ModalHeader, StyledModal } from './TodoModal.styles';
import { Date as ModalDate } from 'components/RightSideDrawer/RightSideDrawer.styles';
import { observer } from 'mobx-react-lite';
import useTodo from '../useTodo';
import { useTodoStore } from 'stores/hooks';
import formDateStringFromISO from 'utils/formDateStringFromISO';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

type TodoModalProps = {
  isVisible: boolean;
  onCancel: VoidFunction;
  clearMainInputValue: VoidFunction;
};

const TodoModal: FC<TodoModalProps> = ({
  isVisible,
  onCancel,
  clearMainInputValue,
}) => {
  const { tempTodoName, setTempSubTodos } = useTodoStore();

  const {
    todoName,
    setTodoName,
    inputChangeHandler,
    addTodo,
    deadline,
    onDeadlineChange,
    deleteDeadline,
    note,
    onTextAreaChange,
    deleteNote,
    isPickerOpen,
    datePickerHandler,
  } = useTodo();

  useEffect(() => {
    setTodoName(tempTodoName);
  }, []);

  const onModalCancel = () => {
    setTodoName('');
    deleteNote();
    deleteDeadline();
    setTempSubTodos([]);
    onCancel();
  };

  const addTodoHandler = () => {
    addTodo();
    onModalCancel();
    clearMainInputValue();
  };

  return (
    <StyledModal
      visible={isVisible}
      onCancel={onModalCancel}
      width={844}
      footer={
        <Button styles={{ verticalMargins: '0' }} onClick={addTodoHandler}>
          Добавить
        </Button>
      }
      centered
      closable={false}
      destroyOnClose
    >
      <ConfigProvider locale={locale}>
        <ModalHeader>
          <Row justify="space-between" align="middle">
            <Col span={20}>
              <Row align="middle" wrap={false}>
                <Col span={2}>
                  <IconButton
                    image={images.clock.default}
                    onClick={datePickerHandler}
                    squareSide="45px"
                    paddings="0"
                  />
                  <StyledDatePicker
                    open={isPickerOpen}
                    onOpenChange={datePickerHandler}
                    onChange={onDeadlineChange}
                    bordered={false}
                  />
                </Col>

                {!!deadline && (
                  <Col span={21} offset={1}>
                    <Row align="middle" wrap={false}>
                      <Col>
                        <ModalDate>
                          {deadline &&
                            `Выполнить до ${formDateStringFromISO(deadline)}`}
                        </ModalDate>
                      </Col>
                      <Col offset={1}>
                        <IconButton
                          image={images.closeBrown.default}
                          squareSide="15px"
                          onClick={deleteDeadline}
                          paddings="0"
                        />
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>

            <Col>
              <IconButton
                image={images.closeBrown.default}
                onClick={onModalCancel}
                squareSide="45px"
                paddings="0"
              />
            </Col>
          </Row>
        </ModalHeader>
      </ConfigProvider>

      <ModalContent>
        <DrawerTodoCard
          name={todoName || tempTodoName}
          onCreateChangeHandler={inputChangeHandler}
        />

        <div>
          <StyledTextArea
            rows={4}
            placeholder="Написать заметку"
            bordered={false}
            autoSize
            value={note}
            onChange={onTextAreaChange}
          />
        </div>
      </ModalContent>
    </StyledModal>
  );
};

export default observer(TodoModal);
