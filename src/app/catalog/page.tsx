'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import styles from './catalog.module.css';

export default function CatalogPage() {
    const { t, locale } = useLanguage();

    const getLocalizedContent = (item: any, field: string) => {
        if (locale === 'uz') return item[`${field}Uz`] || item[field];
        if (locale === 'ru') return item[`${field}Ru`] || item[field];
        return item[field];
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>{t.header.catalog}</span>
                </h1>
                <p className={styles.subtitle}>{categories.length} {t.catalog?.itemsFound || 'kategoriyalar topildi'}</p>
            </header>

            <div className={styles.productGrid}>
                {categories.map(category => (
                    <Link href={`/catalog/${category.slug}`} key={category.id} className={styles.categoryCard}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageOverlay} />
                            <img
                                src={category.image}
                                alt={getLocalizedContent(category, 'name')}
                                className={styles.categoryImage}
                            />
                        </div>
                        <div className={styles.categoryContent}>
                            <h3 className={styles.categoryName}>
                                {getLocalizedContent(category, 'name')}
                            </h3>
                            <span className={styles.viewLink}>
                                {t.news?.readMore || 'Ko\'rish'} &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
