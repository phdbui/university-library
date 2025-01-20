import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const ibmPlexSans = localFont({
  src: [
    {
      path: '../public/fonts/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: '../public/fonts/BebasNeue-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--bebas-neue',
});

export const metadata: Metadata = {
  title: 'BookWise',
  description:
    'BookWise is a book borrowing university library management solution.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
