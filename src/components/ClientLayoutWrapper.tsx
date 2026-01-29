'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import FloatingFoodIcons from '@/components/FloatingFoodIcons';
import MobileNav from '@/components/MobileNav';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
            {!isAdmin && (
                <>
                    <FloatingFoodIcons />
                    <Header />
                </>
            )}

            <main style={{ flex: 1 }}>{children}</main>

            {!isAdmin && (
                <>
                    <Footer />
                    <MobileNav />
                    <FloatingActions />
                </>
            )}
        </div>
    );
}
