'use client';

import React from 'react';
import { FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import styles from './FloatingActions.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingActions() {
    const { t } = useLanguage();
    return (
        <div className={styles.container}>
            <button className={`${styles.actionButton} ${styles.chatButton}`} aria-label={t.floating.chat}>
                <FaCommentDots />
                <span className={styles.label}>{t.floating.chat}</span>
            </button>

            <a href="tel:+998901234567" className={`${styles.actionButton} ${styles.phoneButton}`} aria-label={t.floating.call}>
                <FaPhoneAlt />
                <span className={styles.label}>{t.floating.call}</span>
            </a>
        </div>
    );
}
