import Button from 'components/Button/Button';
import { images } from 'img/common';
import React, { FormEvent, useState } from 'react';
import {
  AuthForm,
  Container,
  Logo,
  Motto,
  TextContent,
  UserData,
  Wrapper,
} from './Auth.styles';

// // todo переписать на styled components
// // todo подумать над вынесением кнопки в отдельный компонент
// // todo вынести цвета
// ? переименовать ли папку Button в Buttons и вообще сам компонент
// ? флекс миксин ок / не ок
// ? фонт миксин ок / не ок

const Auth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const inputHadler = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.name === 'email'
      ? setEmail(e.currentTarget.value)
      : setPassword(e.currentTarget.value);
  };

  const clickHandler = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    // *какой-то запрос*
    console.log('отправляю данные...');
    console.log('email', email);
    console.log('password', password);
    //

    setEmail('');
    setPassword('');
  };

  const data = {
    motto: 'crack your work',
  };

  return (
    <Wrapper>
      <Container>
        <TextContent>
          <Logo>
            <img src={images.logo} alt="logo" />
            <div>CrackerTracker</div>
          </Logo>
          <Motto>{data.motto}</Motto>
        </TextContent>

        <AuthForm>
          <div className="title">{isAuth ? 'Авторизация' : 'Регистрация'}</div>

          <UserData>
            <form action="">
              <label htmlFor="email">Электронная почта</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={inputHadler}
              />

              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={inputHadler}
              />

              <Button
                text={isAuth ? 'Войти' : 'Зарегистрироваться'}
                onClick={clickHandler}
              />
            </form>
          </UserData>

          <div
            className="change-form"
            onClick={() => setIsAuth((isAuth) => !isAuth)}
          >
            {isAuth ? 'Хотите зарегистрироваться?' : 'Уже есть аккаунт?'}
          </div>
        </AuthForm>
      </Container>
    </Wrapper>
  );
};

export default Auth;
