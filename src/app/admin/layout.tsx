'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBox, FaChartLine, FaClipboardList, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: <FaChartLine />, href: '/admin' },
        { name: 'Products', icon: <FaBox />, href: '/admin/products' },
        { name: 'Orders', icon: <FaClipboardList />, href: '/admin/orders' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#101012' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: '#1c1c21',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem 1.5rem',
                position: 'fixed',
                height: '100vh',
                top: 0,
                left: 0,
                zIndex: 100
            }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>Lider<span style={{ color: '#ff9f0a' }}>Admin</span></h2>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    color: isActive ? '#fff' : '#86868b',
                                    background: isActive ? '#ff9f0a' : 'transparent',
                                    fontWeight: isActive ? '600' : '500',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href="/" style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', color: '#86868b', textDecoration: 'none'
                    }}>
                        <FaHome /> Back to Site
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', cursor: 'pointer', fontSize: '1rem', width: '100%', textAlign: 'left'
                        }}
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '260px', padding: '2.5rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
