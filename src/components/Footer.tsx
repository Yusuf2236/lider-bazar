'use client';

import React from 'react';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} {t.footer.rights} {t.footer.copyright}</p>
            </div>
        </footer>
    );
}
