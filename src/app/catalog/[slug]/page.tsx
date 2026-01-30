'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import SearchFilter from '@/components/SearchFilter';
import styles from '../catalog.module.css';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { t } = useLanguage();

    const [searchTerm, setSearchTerm] = React.useState("");

    const category = categories.find(c => c.slug === slug);

    // Initial filtering by category
    const categoryProducts = products.filter(p => {
        const productCategory = categories.find(c => c.name === p.category);
        return productCategory?.slug === slug;
    });

    // Secondary filtering by search term
    const displayedProducts = categoryProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <p className={styles.subtitle}>{displayedProducts.length} {t.catalog?.itemsFound || 'mahsulotlar topildi'}</p>
            </header>

            <SearchFilter onSearch={setSearchTerm} placeholder="Mahsulot qidirish..." />

            <div className={styles.productGrid}>
                {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {displayedProducts.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>Hozircha bu turkumda mahsulotlar yo'q.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
