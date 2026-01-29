'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';
import styles from './AdminLayout.module.css';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Don't show layout on login page
    if (pathname === '/login') {
        return <>{children}</>;
    }

    return (
        <div className={styles.container}>
            {/* Animated Background Layers */}
            <div className={styles.dashboardBackground} />
            <div className={styles.floatingShapes}>
                {/* 15 Normal Stars */}
                {[...Array(15)].map((_, i) => (
                    <div key={`star-${i}`} className={styles.shape} />
                ))}

                {/* 5 Large Stars */}
                {[...Array(5)].map((_, i) => (
                    <div key={`big-star-${i}`} className={`${styles.shape} ${styles.large}`} />
                ))}
            </div>

            {/* Mobile Toggle */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar with props for mobile state would be ideal, 
                but Sidebar checks its own CSS. 
                We might need to adjust sidebar CSS based on this parent state 
                OR we just rely on CSS media queries for desktop/tablet 
                and strictly use this state for mobile overlay. 
                
                For now, let's keep Sidebar simple and just wrap it.
                But wait, Sidebar is fixed. 
                
                We need to pass a class or style to Sidebar to show it on mobile when open.
            */}
            <div className={`
                ${isSidebarOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'}
            `}>
                <Sidebar />
            </div>

            {/* Global style hack for sidebar mobile toggle since we can't easily pass props to the existing Sidebar component without changing it deeply.
                Actually, let's just use a style tag for the mobile visibility logic if we don't refactor Sidebar entirely.
            */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .mobile-sidebar-closed aside {
                        transform: translateX(-100%);
                    }
                    .mobile-sidebar-open aside {
                        transform: translateX(0);
                        width: 250px !important; /* Force full width on mobile open */
                    }
                    .mobile-sidebar-open aside .name,
                    .mobile-sidebar-open aside .logo span, 
                    .mobile-sidebar-open aside .logoutBtn span {
                        display: inline !important; /* Show text */
                    }
                }
            `}</style>

            <main className={styles.main}>
                {children}
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90
                    }}
                    className="md:hidden"
                />
            )}
        </div>
    );
}
