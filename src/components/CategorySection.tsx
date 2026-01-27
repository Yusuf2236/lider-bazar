'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategorySection.module.css';
import { categories } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedContent } from '@/lib/i18n-utils';

export default function CategorySection() {
    const { t, locale } = useLanguage();
    return (
        <section className={styles.categorySection}>
            <h2 className={styles.title}>{t.category.browseBy} <span className={styles.highlight}>{t.category.category}</span></h2>

            <div className={styles.carouselContainer}>
                {categories.map((category) => {
                    const localizedName = getLocalizedContent(category, locale, 'name');
                    return (
                        <Link href={`/catalog/${category.slug}`} key={category.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={category.image}
                                    alt={localizedName}
                                    fill
                                    className={styles.image}
                                    unoptimized
                                />
                            </div>
                            <div className={styles.nameWrapper}>
                                <span className={styles.name}>{localizedName}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
