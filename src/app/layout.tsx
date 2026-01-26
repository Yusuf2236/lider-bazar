import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SessionProvider from '@/context/AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html lang="uz">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <ThemeProvider>
          <SessionProvider>
            <LanguageProvider>
              <ToastProvider>
                <CartProvider>
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <main style={{ flex: 1 }}>{children}</main>
                    <Footer />
                    <FloatingActions />
                  </div>
                </CartProvider>
              </ToastProvider>
            </LanguageProvider>
          </SessionProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
