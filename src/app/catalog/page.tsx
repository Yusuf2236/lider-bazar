'use client';

import React from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './catalog.module.css';

export default function CatalogPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>{t.header.catalog}</span>
                </h1>
                <p className={styles.subtitle}>{products.length} {t.catalog?.itemsFound || 'mahsulotlar topildi'}</p>
            </header>

            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
