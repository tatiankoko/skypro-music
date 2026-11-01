import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';
import { Bounce, ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Skypro-music',
  description: 'Музыкальный сервис Skypro.Music',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <ReduxProvider>
      <html lang="en" className={`${montserrat.variable} `}>
        <body>{children}</body>
      </html>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </ReduxProvider>
  );
}
