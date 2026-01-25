import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lider Bazar - Online Shopping',
  description: 'Online store for Lider Bazar with fast delivery and great prices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <CartProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flex: 1 }}>{children}</main>
                  <Footer />
                </div>
              </CartProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
