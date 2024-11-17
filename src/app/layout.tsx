import type { Metadata } from 'next';

import '@/app/globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { DrawerContextProvider } from '@/contexts/DrawerContext';
import { ModalContextProvider } from '@/contexts/ModalContext';

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
              <Header />
              <main className={'w-max'}>
                {children}
              </main>
              <Footer />
            </ModalContextProvider>
          </DrawerContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
