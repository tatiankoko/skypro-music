'use client';

import classNames from 'classnames';
import Link from 'next/link';
import styles from './signin.module.css';
import React, { ChangeEvent, useState } from 'react';
import { authUser } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/features/authSlice';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    setLoading(true);

    authUser({ email, password })
      .then((user) => {
        dispatch(setUser(user));
        router.push('/home/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            setErrorMessage('Отсутствует интернет');
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <a href="/home/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
        autoComplete="on"
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
        autoComplete="on"
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={loading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
