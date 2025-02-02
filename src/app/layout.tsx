import type { Metadata } from 'next';

import '@/app/globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { DrawerContextProvider } from '@/contexts/DrawerContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import { NotificationContextProvider } from '@/contexts/NotificationContext';

export const metadata: Metadata = {
  title: '길 가던 사람들',
  description: '길 가던 사람들한테 물어봐라의 그 길 가던 사람들이 모여있는 곳',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'ko'}>
      <body>
        <AuthContextProvider>
          <DrawerContextProvider>
            <ModalContextProvider>
              <NotificationContextProvider>
                <Header />
                <main className={'w-max'}>
                  {children}
                </main>
                <Footer />
              </NotificationContextProvider>
            </ModalContextProvider>
          </DrawerContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
