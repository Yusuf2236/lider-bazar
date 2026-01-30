import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SessionProvider from '@/context/AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import AnimatedBackground from '@/components/AnimatedBackground';

// const inter = Inter({ subsets: ['latin'] });

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Lider Bazar - Online Shopping',
  description: 'Online store for Lider Bazar with fast delivery and great prices.',
  manifest: '/manifest.json',
  icons: {
    icon: '/android-chrome-192x192.png',
    shortcut: '/android-chrome-192x192.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lider Bazar',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }} suppressHydrationWarning>
        <ThemeProvider>
          <SessionProvider>
            <LanguageProvider>
              <ToastProvider>
                <CartProvider>
                  <WishlistProvider>
                    <GoogleAnalytics />
                    <ClientLayoutWrapper>
                      {children}
                    </ClientLayoutWrapper>
                  </WishlistProvider>
                </CartProvider>
              </ToastProvider>
            </LanguageProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
