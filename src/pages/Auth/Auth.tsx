import Button from 'components/Button';
import motto from 'config/motto';
import { images } from 'img/common';
import React from 'react';
import {
  AuthForm,
  ChangeForm,
  Container,
  Input,
  Label,
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

  return (
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
  );
};

export default Auth;
