'use client';

import React from 'react';
import { FaHistory, FaBullseye, FaGem, FaHandshake, FaUserFriends, FaLightbulb } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import styles from './about.module.css';

export default function AboutPage() {
    const { t } = useLanguage();

    const values = [
        { id: 1, title: t.about.value1, icon: <FaHandshake />, desc: 'Ishonch va sifat bizning ustuvorligimiz.' },
        { id: 2, title: t.about.value2, icon: <FaUserFriends />, desc: 'Har bir mijoz biz uchun qadrli.' },
        { id: 3, title: t.about.value3, icon: <FaLightbulb />, desc: 'Yangi texnologiyalar orqali qulaylik.' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t.about.title}</h1>
            </header>

            <div className={styles.sections}>
                {/* Our Story */}
                <section className={`${styles.aboutSection} glass`}>
                    <div className={styles.sectionHeader}>
                        <FaHistory />
                        <h2>{t.about.storyTitle}</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <p>{t.about.storyDesc}</p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className={`${styles.aboutSection} glass`}>
                    <div className={styles.sectionHeader}>
                        <FaBullseye />
                        <h2>{t.about.missionTitle}</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <p>{t.about.missionDesc}</p>
                    </div>
                </section>

                {/* Our Values */}
                <section className={styles.valuesSection}>
                    <div className={styles.valuesHeader}>
                        <FaGem />
                        <h2>{t.about.valuesTitle}</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value) => (
                            <div key={value.id} className={`${styles.valueCard} glass`}>
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
