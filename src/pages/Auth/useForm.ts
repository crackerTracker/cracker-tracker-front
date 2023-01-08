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
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      isAuth
        ? await loginHandler(email, password)
        : await registerHandler(email, password);

      setEmail('');
      setPassword('');
    },
    [email, password, isAuth]
  );

  const onChangeForm = useCallback(() => {
    setIsAuth((isAuth) => !isAuth);
  }, []);

  return { clickHandler, inputHandler, onChangeForm, email, password, isAuth };
};

export default useForm;
