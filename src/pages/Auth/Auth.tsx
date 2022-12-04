import Button from 'components/Button';
import Spinner, { SpinnerSizesEnum } from 'components/Spinner';
import motto from 'config/motto';
import { images } from 'img/common';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useAuthStore } from 'stores/hooks';
import {
  AuthForm,
  ChangeForm,
  Container,
  Input,
  Label,
  LoaderContainer,
  Logo,
  Motto,
  TextContent,
  Title,
  UserData,
  Wrapper,
} from './Auth.styles';
import useForm from './useForm';

const Auth = () => {
  const { inputHandler, clickHandler, onChangeForm, email, password, isAuth } =
    useForm();

  const {
    meta: { isLoading },
  } = useAuthStore();

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <Spinner size={SpinnerSizesEnum.xl} />
        </LoaderContainer>
      ) : (
        <Wrapper>
          <Container>
            <TextContent>
              <Logo>
                <img src={images.logo} alt="logo" />
                <div>CrackerTracker</div>
              </Logo>
              <Motto>{motto[0]}</Motto>
            </TextContent>

            <AuthForm>
              <Title>{isAuth ? 'Авторизация' : 'Регистрация'}</Title>

              <UserData>
                <form action="">
                  <Label htmlFor="email">Электронная почта</Label>
                  <Input name="email" value={email} onChange={inputHandler} />

                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={inputHandler}
                  />

                  <Button onClick={clickHandler}>
                    {isAuth ? 'Войти' : 'Зарегистрироваться'}
                  </Button>
                </form>
              </UserData>

              <ChangeForm onClick={onChangeForm}>
                {isAuth ? 'Хотите зарегистрироваться?' : 'Уже есть аккаунт?'}
              </ChangeForm>
            </AuthForm>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default observer(Auth);
