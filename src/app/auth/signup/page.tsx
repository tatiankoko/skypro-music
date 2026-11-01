'use client';

import Link from 'next/link';
import classNames from 'classnames';
import styles from './signup.module.css';
import React, { ChangeEvent, useState } from 'react';
import { registerUser } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setUsername(event.target.value.split('@')[0] || event.target.value);
  };

  const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== confirmPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    setLoading(true);

    registerUser({ email, password, username })
      .then(() => {
        router.push('/auth/signin');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Произошла ошибка. Попробуйте позже');
          } else {
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
      <Link href="/home/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
        autoComplete="on"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
        autoComplete="off"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeConfirmPassword}
        autoComplete="off"
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnSignupEnt}
        disabled={loading}
        onClick={onSubmit}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
