'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHome, FaThLarge, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import styles from './MobileNav.module.css';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileNav() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname);
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    // Define navigation items
    const navItems = [
        { id: 'home', icon: FaHome, label: 'Home', href: '/' },
        { id: 'catalog', icon: FaThLarge, label: 'Katalog', href: '/catalog' },
        {
            id: 'cart',
            icon: FaShoppingCart,
            label: 'Savat',
            href: '/checkout',
            badge: cartCount
        },
        {
            id: 'wishlist',
            icon: FaHeart,
            label: 'Sevimli',
            href: '/wishlist', // Ensure this page exists or redirect accordingly
            badge: wishlistCount
        },
        { id: 'profile', icon: FaUser, label: 'Profil', href: '/profile' },
    ];

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
                            {mounted && item.badge !== undefined && item.badge > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full flex items-center justify-center min-w-[16px] h-[16px]">
                                    {item.badge}
                                </span>
                            )}
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
        </div>
    );
}
