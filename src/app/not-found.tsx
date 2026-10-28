import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not_found__wrapper">
      <div className="not_found__container">
        <h1 className="not_found__number">404</h1>
        <h2 className="not_found__message">Страница не найдена 😭</h2>

        <p className="not_found__description">
          Возможно, она была удалена
          <br />
          или перенесена на другой адрес
        </p>

        <Link
          href={'/home/main'}
          prefetch={false}
          className="not_found__button"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
