'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';
import { FaChevronDown } from 'react-icons/fa';

const flags = {
    uz: '🇺🇿',
    ru: '🇷🇺',
    en: '🇺🇸',
} as const;

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper} ref={dropdownRef}>
            <button
                className={`${styles.button} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change Language"
            >
                <span className={styles.flag}>{flags[locale]}</span>
                <span className={styles.code}>{locale.toUpperCase()}</span>
                <FaChevronDown className={styles.chevron} />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {(Object.keys(flags) as Array<keyof typeof flags>).map((key) => (
                        <button
                            key={key}
                            className={`${styles.option} ${locale === key ? styles.selected : ''}`}
                            onClick={() => {
                                setLocale(key);
                                setIsOpen(false);
                            }}
                        >
                            <span className={styles.flag}>{flags[key]}</span>
                            <span className={styles.label}>
                                {key === 'uz' ? 'O\'zbek' : key === 'ru' ? 'Русский' : 'English'}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
