'use client';

import React, { useState } from 'react';
import { FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import ChatModal from './ChatModal';
import styles from './FloatingActions.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingActions() {
    const { t } = useLanguage();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button
                className={`${styles.actionButton} ${styles.chatButton}`}
                aria-label={t.floating.chat}
                onClick={() => setIsChatOpen(true)}
            >
                <FaCommentDots />
                <span className={styles.label}>{t.floating.chat}</span>
            </button>

            <a href="tel:+998200054004" className={`${styles.actionButton} ${styles.phoneButton}`} aria-label={`${t.floating.call}: +998 (20) 005-40-04`}>
                <FaPhoneAlt />
                <span className={styles.label}>{t.floating.call}</span>
            </a>

            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}
