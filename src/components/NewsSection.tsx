'use client';

import React from 'react';
import Image from 'next/image';
import styles from './NewsSection.module.css';
import { news } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsSection() {
    const { t } = useLanguage();
    return (
        <section className={styles.newsSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>{t.news.title}</h2>
                <div className={styles.grid}>
                    {news.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className={styles.image}
                                    unoptimized
                                />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.date}>{item.date}</span>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.excerpt}>{item.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
