'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaHistory, FaAward, FaTruck } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    const { t } = useLanguage();
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div className={styles.header} {...fadeIn}>
                    <h2 className={styles.title}>{t.about.title}</h2>
                    <p className={styles.subtitle}>{t.about.subtitle}</p>
                </motion.div>

                <div className={styles.grid}>
                    <motion.div className={styles.card} {...fadeIn} transition={{ delay: 0.1 }}>
                        <div className={styles.iconWrapper}><FaStore /></div>
                        <h3>{t.about.modernTitle}</h3>
                        <p>{t.about.modernDesc}</p>
                    </motion.div>

                    <motion.div className={styles.card} {...fadeIn} transition={{ delay: 0.2 }}>
                        <div className={styles.iconWrapper}><FaHistory /></div>
                        <h3>{t.about.historyTitle}</h3>
                        <p>{t.about.historyDesc}</p>
                    </motion.div>

                    <motion.div className={styles.card} {...fadeIn} transition={{ delay: 0.3 }}>
                        <div className={styles.iconWrapper}><FaAward /></div>
                        <h3>{t.about.qualityTitle}</h3>
                        <p>{t.about.qualityDesc}</p>
                    </motion.div>

                    <motion.div className={styles.card} {...fadeIn} transition={{ delay: 0.4 }}>
                        <div className={styles.iconWrapper}><FaTruck /></div>
                        <h3>{t.about.deliveryTitle}</h3>
                        <p>{t.about.deliveryDesc}</p>
                    </motion.div>
                </div>

                <motion.div className={styles.stats} {...fadeIn} transition={{ delay: 0.5 }}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>3+</span>
                        <span className={styles.statLabel}>{t.about.stats.years}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>5k+</span>
                        <span className={styles.statLabel}>{t.about.stats.customers}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>10k+</span>
                        <span className={styles.statLabel}>{t.about.stats.orders}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>24/7</span>
                        <span className={styles.statLabel}>{t.about.stats.support}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
