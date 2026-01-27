'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import { FaTag } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

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
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {t.hero.welcomePrefix} <span className={styles.brandName}>Lider Bazar</span> {t.hero.welcome}
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            <section className={styles.discountSection}>
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <FaTag className={styles.tagIcon} />
                    <h2 className={styles.sectionTitle}>{t.hero.specialDiscounts} <span className={styles.highlight}>{t.hero.discounts}</span></h2>
                </motion.div>

                <motion.div
                    className={styles.carouselContainer}
                    ref={scrollRef}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
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
                </motion.div>
            </section>
        </>
    );
}
