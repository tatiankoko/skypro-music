import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Nav from '@/components/nav/Nav';
import { setIsAuth } from '@/store/features/authSlice';
import { makeStore } from '@/store/store';

const renderNav = (store = makeStore()) => {
  return render(
    <Provider store={store}>
      <Nav />
    </Provider>,
  );
};

describe('Nav component', () => {
  test('Корректное отображение элементов при отсутствии авторизации', () => {
    const { container } = renderNav();

    fireEvent.click(container.querySelector('.nav__burger')!);

    expect(screen.getByText('Главное')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Мой плейлист' }),
    ).not.toBeInTheDocument();
  });

  test('Корректное отображение элементов при успешной авторизации', () => {
    const store = makeStore();
    store.dispatch(setIsAuth());
    const { container } = renderNav(store);

    fireEvent.click(container.querySelector('.nav__burger')!);

    expect(screen.getByText('Мой плейлист')).toBeInTheDocument();
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });
});
