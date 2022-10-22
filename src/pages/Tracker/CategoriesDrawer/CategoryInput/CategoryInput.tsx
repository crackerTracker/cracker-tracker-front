import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonWrapper,
  ColorPickerWrapper,
  Container,
  Content,
  StyledInput,
  Subtrate,
} from './CategoryInput.styles';
import { images } from 'img/icons';
import Button from './Button';
import { CategoryType } from 'stores/TrackerStore/types';
import colors from 'styles/colors';
import ColorButton from './ColorButton';
import ColorPicker from './ColorPicker';
import { useTrackerStore } from 'stores/hooks';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';

type Props = {
  editedCategory: CategoryType | null;
  setEditedCategory: React.Dispatch<CategoryType | null>;
  isDrawerVisible: boolean;
};

// todo сделать изменение состояния инпута при ошибке и перехватывать ошибки
const CategoryInput: React.FC<Props> = ({
  editedCategory,
  setEditedCategory,
  isDrawerVisible,
}) => {
  const { createCategory, editCategory, categoryEditing } = useTrackerStore();
  const [color, setColor] = useState<string | null>(null);
  const [colorPicking, setColorPicking] = useState(false);
  const [name, setName] = useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setColor(editedCategory ? editedCategory.color : null);
    setColorPicking(false);
    setName(editedCategory ? editedCategory.name : '');
  }, [editedCategory, isDrawerVisible]);

  const onClickCreate = async () => {
    if (!color) {
      message.error('Не указан цвет');
      return;
    }

    if (!name) {
      message.error('Не указано имя категории');
      return;
    }

    await createCategory(name, color);
    setName('');
    setColor(null);
    setColorPicking(false);
  };

  const onClickCancelEditing = () => {
    setEditedCategory(null);
    setColor(null);
  };

  const onClickApproveEditing = async () => {
    if (!color) {
      message.error('Не указан цвет');
      return;
    }

    if (!name) {
      message.error('Не указано имя категории');
      return;
    }

    if (!editedCategory) {
      message.error('Что-то пошло не так');
      return;
    }

    await editCategory(editedCategory.id, {
      name,
      color,
    });
    setEditedCategory(null);
    setColor(null);
  };

  const onChangeColor = (color: string) => {
    setColor(color);
  };

  const initColorPick = (e: React.MouseEvent<HTMLDivElement>) => {
    setColor(colors.black);
    setColorPicking(true);

    // @ts-ignore
    e.target['colorPickClick'] = true;
  };

  const onClickColorPick = (e: React.MouseEvent<HTMLDivElement>) => {
    setColorPicking(true);
    // @ts-ignore
    e.target['clickColorPick'] = true;
  };

  const targetComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        // @ts-ignore
        !e.target['colorPickClick'] &&
        targetComponent.current &&
        !targetComponent.current.contains(e.target as Node)
      ) {
        setColorPicking(false);
      }
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [targetComponent]);

  return (
    <Container>
      <Subtrate />
      <Content>
        <StyledInput
          value={name}
          onChange={onChangeName}
          placeholder="Введите название категории"
          disabled={categoryEditing}
        />

        {!editedCategory && (
          <>
            <ButtonWrapper withoutOpacityChange={!!color} ref={targetComponent}>
              {color ? (
                <>
                  <ColorPickerWrapper>
                    <ColorPicker
                      visible={!!color && colorPicking}
                      color={color}
                      onChange={onChangeColor}
                    />
                  </ColorPickerWrapper>

                  <ColorButton color={color} onClick={onClickColorPick} />
                </>
              ) : (
                <Button
                  image={images.brushBrown.default}
                  onClick={initColorPick}
                />
              )}
            </ButtonWrapper>

            <ButtonWrapper>
              <Button
                image={images.plusBrown.default}
                onClick={onClickCreate}
              />
            </ButtonWrapper>
          </>
        )}

        {editedCategory && color && (
          <>
            <ButtonWrapper withoutOpacityChange ref={targetComponent}>
              <ColorPickerWrapper>
                <ColorPicker
                  visible={colorPicking}
                  color={color}
                  onChange={onChangeColor}
                />
              </ColorPickerWrapper>

              <ColorButton
                isDisabled={categoryEditing}
                color={color}
                onClick={onClickColorPick}
              />
            </ButtonWrapper>

            <ButtonWrapper isDisabled={categoryEditing}>
              <Button
                image={images.checkBrown.default}
                onClick={onClickApproveEditing}
                isLoading={categoryEditing}
                isDisabled={categoryEditing}
              />
            </ButtonWrapper>

            <ButtonWrapper isDisabled={categoryEditing}>
              <Button
                image={images.closeBrown.default}
                onClick={onClickCancelEditing}
                isDisabled={categoryEditing}
              />
            </ButtonWrapper>
          </>
        )}
      </Content>
    </Container>
  );
};

export default observer(CategoryInput);
