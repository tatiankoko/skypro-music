import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.not_found__wrapper}>
      <div className={styles.not_found__container}>
        <h1 className={styles.not_found__number}>404</h1>
        <h2 className={styles.not_found__message}>Страница не найдена 😭</h2>

        <p className={styles.not_found__description}>
          Возможно, она была удалена
          <br />
          или перенесена на другой адрес
        </p>

        <Link href={'/home/main'} className={styles.not_found__button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
