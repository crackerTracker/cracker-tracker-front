import React, { FC, useState, memo, useCallback } from 'react';
import { message } from 'antd';
import Modal, { ModalProps } from 'components/Modal';
import Button from 'components/Button';
import { pomoRestSettings, RestMinutesType, RestType } from 'config/pomoconf';
import { SettingsItem, StyledInputNumber } from './PomoSettingsModal.styles';
import { formatInputMinutes, getRestSettings } from './PomoSettingsModal.utils';

const PomoSettingsModal: FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
}: ModalProps) => {
  // to handle inputs and to be able to cancel changes on modal close
  const [tempRestMinutes, setTempRestMinutes] = useState<RestMinutesType>(
    getRestSettings()
  );

  // to handle antd input based on its rest type
  const onChange = (name: RestType) => (value: number) => {
    if (name === RestType.short) {
      setTempRestMinutes({ ...tempRestMinutes, short: value });
    }
    if (name === RestType.long) {
      setTempRestMinutes({ ...tempRestMinutes, long: value });
    }
  };

  const onCancel = useCallback(() => {
    setTempRestMinutes(getRestSettings());
    onClose();
  }, [onClose]);

  const onSave = useCallback(() => {
    localStorage.setItem(pomoRestSettings, JSON.stringify(tempRestMinutes));
    message.success('Сохранено');
    onClose();
  }, [tempRestMinutes, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      footer={
        <Button onClick={onSave} styles={{ verticalMargins: '10px' }}>
          Сохранить
        </Button>
      }
    >
      <div>
        <SettingsItem>
          <div>Короткий перерыв:</div>
          <div>
            <StyledInputNumber
              min={1}
              defaultValue={getRestSettings().short}
              onChange={onChange(RestType.short)}
              value={tempRestMinutes.short}
              bordered={false}
              formatter={formatInputMinutes}
            />
          </div>
        </SettingsItem>
        <SettingsItem>
          <div>Длинный перерыв:</div>
          <div>
            <StyledInputNumber
              min={1}
              defaultValue={getRestSettings().long}
              onChange={onChange(RestType.long)}
              value={tempRestMinutes.long}
              bordered={false}
              formatter={formatInputMinutes}
            />
          </div>
        </SettingsItem>
      </div>
    </Modal>
  );
};

export default memo(PomoSettingsModal);
