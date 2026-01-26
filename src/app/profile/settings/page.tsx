'use client';

import React, { useState } from 'react';
import { FaUser, FaGlobe, FaMoon, FaSun, FaBell, FaSave } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import styles from './settings.module.css';

export default function SettingsPage() {
    const { locale, setLocale, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();

    // Mock user state
    const [user, setUser] = useState({
        name: 'Yusuf',
        phone: '+998 90 123 45 67',
        email: 'yusuf@example.com'
    });

    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        addToast(t.settings.successMessage, 'success');
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.card} glass`}>
                <header className={styles.header}>
                    <h1>{t.settings.title}</h1>
                </header>

                <div className={styles.sections}>
                    {/* Profile Information */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FaUser />
                            <h2>{t.settings.profileInfo}</h2>
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles.inputGroup}>
                                <label>{t.settings.fullName}</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="glass"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>{t.settings.phoneNumber}</label>
                                <input
                                    type="text"
                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                    className="glass"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>{t.settings.email}</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="glass"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Appearance & Language */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FaGlobe />
                            <h2>{t.settings.appearance}</h2>
                        </div>
                        <div className={styles.settingsGrid}>
                            <div className={styles.settingItem}>
                                <span>{t.settings.language}</span>
                                <select
                                    value={locale}
                                    onChange={(e) => setLocale(e.target.value as any)}
                                    className="glass"
                                >
                                    <option value="uz">O'zbekcha</option>
                                    <option value="ru">Русский</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div className={styles.settingItem}>
                                <span>{t.settings.theme}</span>
                                <button className={`${styles.themeToggle} glass`} onClick={toggleTheme}>
                                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                                    {theme === 'light' ? t.settings.dark : t.settings.light}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Notifications */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FaBell />
                            <h2>{t.settings.notifications}</h2>
                        </div>
                        <div className={styles.settingItem}>
                            <span>{t.settings.pushNotifications}</span>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </section>
                </div>

                <footer className={styles.footer}>
                    <button className={styles.saveBtn} onClick={handleSave}>
                        <FaSave /> {t.settings.saveChanges}
                    </button>
                </footer>
            </div>
        </div>
    );
}
