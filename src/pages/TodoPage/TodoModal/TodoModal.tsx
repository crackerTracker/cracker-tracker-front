import { Col, Row } from 'antd';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import { images } from 'img/icons';
import React, { FC } from 'react';
import DrawerTodoCard from '../DrawerTodoCard';
import {
  StyledDatePicker,
  StyledTextArea,
} from '../TodoRightDrawer/TodoRightDrawer.styles';
import { ModalContent, ModalHeader, StyledModal } from './TodoModal.styles';
import { observer } from 'mobx-react-lite';
import { Date as ModalDate } from '../../../components/RightSideDrawer/RightSideDrawer.styles';
import useTodo from '../useTodo';

const TodoModal: FC<{
  isVisible: boolean;
  taskName: string;
  onCancel: VoidFunction;
  onAdd: VoidFunction;
}> = ({ isVisible, taskName, onCancel, onAdd }) => {
  const {
    deadline,
    onDeadlineChange,
    deleteDeadline,
    note,
    onTextAreaChange,
    deleteNote,
    isPickerOpen,
    datePickerHandler,
  } = useTodo({});

  const onModalCancel = () => {
    deleteNote();
    deleteDeadline();
    onCancel();
  };

  const addTodoHandler = () => {
    onAdd();
    onModalCancel();
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
                      <ModalDate>Выполнить до {deadline}</ModalDate>
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

      <ModalContent>
        <DrawerTodoCard name={taskName} />

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
