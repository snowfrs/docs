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

import { GoogleAnalytics } from '@next/third-parties/google';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
        </RootProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
