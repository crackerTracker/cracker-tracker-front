import { FormEvent, useCallback, useState } from 'react';

const useForm = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const inputHandler = useCallback((e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.name === 'email'
      ? setEmail(e.currentTarget.value)
      : setPassword(e.currentTarget.value);
  }, []);

  const clickHandler = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      // *какой-то запрос*
      console.log('отправляю данные...');
      console.log('email', email);
      console.log('password', password);
      //

      setEmail('');
      setPassword('');
    },
    [email, password]
  );

  const onChangeForm = useCallback(() => {
    setIsAuth((isAuth) => !isAuth);
  }, []);

  return { clickHandler, inputHandler, onChangeForm, email, password, isAuth };
};

export default useForm;
