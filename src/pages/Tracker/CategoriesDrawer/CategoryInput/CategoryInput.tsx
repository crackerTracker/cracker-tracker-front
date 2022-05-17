import React from 'react';
import {
  ButtonWrapper,
  Container,
  Content,
  StyledInput,
  Subtrate,
} from './CategoryInput.styles';
import { images } from 'img/icons';
import Button from './Button';

export enum CategoryInputTypesEnum {
  creating = 'creating',
  editing = 'editing',
}

type Props = {
  type: CategoryInputTypesEnum;
};

const CategoryInput: React.FC<Props> = ({ type }) => {
  return (
    <Container>
      <Subtrate />
      <Content>
        <StyledInput placeholder="Введите название категории" />

        {type === CategoryInputTypesEnum.creating && (
          <>
            <ButtonWrapper>
              <Button image={images.brushBrown.default} />
            </ButtonWrapper>

            <ButtonWrapper>
              <Button image={images.plusBrown.default} />
            </ButtonWrapper>
          </>
        )}

        {type === CategoryInputTypesEnum.editing && (
          <>
            <ButtonWrapper>
              <Button image={images.brushBrown.default} />
            </ButtonWrapper>

            <ButtonWrapper>
              <Button image={images.checkBrown.default} />
            </ButtonWrapper>

            <ButtonWrapper>
              <Button image={images.closeBrown.default} />
            </ButtonWrapper>
          </>
        )}
      </Content>
    </Container>
  );
};

export default CategoryInput;
