'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaBox, FaHeart, FaCog, FaSignOutAlt, FaChevronRight, FaShieldAlt, FaEnvelope } from 'react-icons/fa';
import styles from './profile.module.css';

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) return null;

    const isAdmin = (session.user as any)?.role === 'ADMIN';

    const menuItems = [
        {
            icon: <FaBox />,
            label: 'Buyurtmalarim',
            href: '/profile/history',
        },
        {
            icon: <FaHeart />,
            label: 'Sevimlilar',
            href: '/wishlist',
        },
        {
            icon: <FaCog />,
            label: 'Sozlamalar',
            href: '/profile/settings',
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <div className={styles.avatarContainer}>
                    {session.user?.name?.[0] || <FaUser />}
                </div>
                <h2 className={styles.name}>{session.user?.name}</h2>
                <div className={styles.email}>
                    <FaEnvelope size={14} /> {session.user?.email}
                </div>
            </motion.div>

            {/* Menu */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.menu}
            >
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href} className={styles.menuItem}>
                        <div className={styles.menuLeft}>
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                        <FaChevronRight className={styles.arrow} />
                    </Link>
                ))}

                {/* Admin Link */}
                {isAdmin && (
                    <Link href="/admin" className={`${styles.menuItem} ${styles.adminBtn}`}>
                        <div className={styles.menuLeft}>
                            <FaShieldAlt className={styles.icon} />
                            <span>Admin Panel</span>
                        </div>
                        <FaChevronRight className={styles.arrow} />
                    </Link>
                )}

                {/* Logout */}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className={`${styles.menuItem} ${styles.logoutBtn}`}
                >
                    <div className={styles.menuLeft}>
                        <FaSignOutAlt className={styles.icon} />
                        <span>Chiqish</span>
                    </div>
                    <FaChevronRight className={styles.arrow} />
                </button>
            </motion.div>
        </div>
    );
}
