'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import { FaTag } from 'react-icons/fa';

import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Discount/Scroll Logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;
        const scrollInterval = setInterval(() => {
            // Auto scroll slightly slower or just ensure it exists
        }, 5000);
        return () => clearInterval(scrollInterval);
    }, []);

    const discountedProducts = products.filter(p => p.oldPrice);

    return (
        <>
            <section className={styles.heroBanner}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.heroTitle}>{t.hero.welcomePrefix} <span className={styles.brandName}>Lider Bazar</span> {t.hero.welcome}</h1>
                    <p className={styles.heroSubtitle}>{t.hero.subtitle}</p>
                </div>
            </section>

            <section className={styles.discountSection}>
                <div className={styles.sectionHeader}>
                    <FaTag className={styles.tagIcon} />
                    <h2 className={styles.sectionTitle}>{t.hero.specialDiscounts} <span className={styles.highlight}>{t.hero.discounts}</span></h2>
                </div>

                <div className={styles.carouselContainer} ref={scrollRef}>
                    {discountedProducts.map((product) => (
                        <div key={product.id} className={styles.cardWrapper}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {/* Duplicates for scroll feel */}
                    {discountedProducts.map((product) => (
                        <div key={`dup-${product.id}`} className={styles.cardWrapper}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
