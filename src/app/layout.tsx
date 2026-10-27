import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';

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
    </ReduxProvider>
  );
}
