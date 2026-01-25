'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../catalog.module.css';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { t } = useLanguage();

    const category = categories.find(c => c.slug === slug);

    // Filter products by category NAME, as defined in lib/data.ts
    // In a real app, this should probably be based on category ID or slug
    const filteredProducts = products.filter(p => {
        // Find the category object that matches the product's category name
        const productCategory = categories.find(c => c.name === p.category);
        return productCategory?.slug === slug;
    });

    if (!category) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Category not found</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>{category.name}</span>
                </h1>
                <p className={styles.subtitle}>{filteredProducts.length} {t.catalog?.itemsFound || 'mahsulotlar topildi'}</p>
            </header>

            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>Hozircha bu turkumda mahsulotlar yo'q.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
