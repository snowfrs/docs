import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({
//   subsets: ['latin'],
// });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wiki - The Power of Many',
  description: 'Comprehensive resource for IT professionals',
  icons: {
    icon: '/assets/images/favicon.ico',
  },
};

import { CSPostHogProvider } from './providers';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <CSPostHogProvider>
          <RootProvider>
            {children}
          </RootProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
