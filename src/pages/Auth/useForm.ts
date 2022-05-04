import { FormEvent, useCallback, useState } from 'react';
import { useAuthStore } from 'stores/hooks';

const useForm = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginHandler, registerHandler } = useAuthStore();

  const inputHandler = useCallback((e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.name === 'email'
      ? setEmail(e.currentTarget.value)
      : setPassword(e.currentTarget.value);
  }, []);

  const clickHandler = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      isAuth ? loginHandler(email, password) : registerHandler(email, password);

      setEmail('');
      setPassword('');
    },
    [email, password, isAuth, loginHandler, registerHandler]
  );

  const onChangeForm = useCallback(() => {
    setIsAuth((isAuth) => !isAuth);
  }, []);

  return { clickHandler, inputHandler, onChangeForm, email, password, isAuth };
};

export default useForm;
