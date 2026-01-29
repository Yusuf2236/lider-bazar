'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FaChartLine, FaBoxOpen, FaClipboardList, FaStore, FaSignOutAlt, FaPlus, FaShoppingCart } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaChartLine /> },
    { name: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
    { name: 'Products', path: '/products', icon: <FaBoxOpen /> },
    { name: 'Inventory', path: '/inventory', icon: <FaClipboardList /> },
    { name: 'Reports', path: '/reports', icon: <FaChartLine /> },
    { name: 'Settings', path: '/settings', icon: <FaClipboardList /> }, // Simple icon reuse
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <FaStore className={styles.logoIcon} />
                    <span>Lider <span className={styles.highlight}>Admin</span></span>
                </div>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.name}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.bottom}>
                <button className={styles.logoutBtn} onClick={() => signOut()}>
                    <FaSignOutAlt /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
