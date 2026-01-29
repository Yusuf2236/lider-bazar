'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHome, FaThLarge, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import styles from './MobileNav.module.css';

export default function MobileNav() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname);

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    // Define navigation items
    const navItems = [
        { id: 'home', icon: FaHome, label: 'Home', href: '/' },
        { id: 'catalog', icon: FaThLarge, label: 'Katalog', href: '/catalog' },
        { id: 'cart', icon: FaShoppingCart, label: 'Savat', href: '/checkout' }, // Assuming checkout/cart
        { id: 'profile', icon: FaUser, label: 'Profil', href: '/profile' },
        // { id: 'search', icon: FaSearch, label: 'Qidiruv', href: '/search' },
    ];

    // Find custom index for indicator position if needed, 
    // or just rely on layout rendering order.
    // For specific "curve" animation we often use `layoutId`.

    return (
        <div className={styles.navContainer}>
            {navItems.map((item) => {
                const isActive = activeTab === item.href || (item.href !== '/' && activeTab.startsWith(item.href));

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        onClick={() => setActiveTab(item.href)}
                    >
                        <span style={{ position: 'relative', zIndex: 3 }}>
                            <item.icon className={styles.icon} />
                        </span>

                        <span className={styles.label}>{item.label}</span>

                        {isActive && (
                            <motion.div
                                layoutId="activeTabCircle"
                                className={styles.indicator}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    left: '50%',
                                    marginLeft: '-30px', /* Half of width to center */
                                    bottom: '25px' // Adjust vertically
                                }}
                            />
                        )}
                    </Link>
                );
            })}

            {/* SVG Filter for Gooey effect or perfect curve could be added here if customized */}
        </div>
    );
}
