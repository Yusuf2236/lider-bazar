'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { FaSun, FaMoon, FaShoppingCart, FaUser, FaBars, FaCog, FaHistory, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import Search from './Search';
import LanguageSwitcher from './LanguageSwitcher';
import CartDrawer from './CartDrawer';
import styles from './Header.module.css';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const { t } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        setMounted(true);
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    {/* Left: Logo */}
                    <Link href="/" className={styles.logo}>
                        <FaShoppingCart className={styles.logoIcon} />
                        <span>Lider <span className={styles.brandHighlight}>Bazar</span></span>
                    </Link>

                    {/* Center: Search */}
                    <div className={styles.searchContainer}>
                        <Search />
                    </div>

                    {/* Right: Actions */}
                    <nav className={styles.nav}>
                        <LanguageSwitcher />

                        <div className={styles.cartWrapper}>
                            <button
                                className={styles.iconButton}
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Savatcha"
                            >
                                <FaShoppingCart />
                                {mounted && cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                            </button>
                        </div>

                        <Link href="/catalog" className={styles.navLink}>
                            <FaBars /> {t.header.catalog}
                        </Link>
                        <Link href="/news" className={styles.navLink}>
                            {t.header.news}
                        </Link>

                        <div className={styles.userMenuWrapper} ref={dropdownRef}>
                            <button
                                className={`${styles.iconButton} ${isDropdownOpen ? styles.active : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <FaUser />
                            </button>

                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <Link href="/profile/settings" className={styles.dropdownItem}>
                                        <FaCog /> {t.user.settings}
                                    </Link>
                                    <Link href="/profile/history" className={styles.dropdownItem}>
                                        <FaHistory /> {t.user.history}
                                    </Link>
                                    <Link href="/help" className={styles.dropdownItem}>
                                        <FaQuestionCircle /> {t.user.help}
                                    </Link>
                                    <Link href="/about" className={styles.dropdownItem}>
                                        <FaInfoCircle /> {t.user.about}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <button className={styles.iconButton} onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>
                    </nav>
                </div>
            </header>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
