'use client';

import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import styles from './help.module.css';

export default function HelpPage() {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        { id: 1, question: t.help.faq1, answer: t.help.ans1 },
        { id: 2, question: t.help.faq2, answer: t.help.ans2 },
        { id: 3, question: t.help.faq3, answer: t.help.ans3 },
    ];

    const toggleFaq = (id: number) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t.help.title}</h1>
                <div className={`${styles.searchBox} glass`}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder={t.help.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <div className={styles.contentGrid}>
                {/* Popular Questions */}
                <section className={`${styles.faqSection} glass`}>
                    <div className={styles.sectionTitle}>
                        <FaQuestionCircle />
                        <h2>{t.help.popularQuestions}</h2>
                    </div>
                    <div className={styles.faqList}>
                        {faqs.map((faq) => (
                            <div key={faq.id} className={styles.faqItem}>
                                <button
                                    className={styles.faqHeader}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <span>{faq.question}</span>
                                    {openFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openFaq === faq.id && (
                                    <div className={styles.faqAnswer}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Us */}
                <section className={`${styles.contactSection} glass`}>
                    <div className={styles.sectionTitle}>
                        <FaEnvelope />
                        <h2>{t.help.contactUs}</h2>
                    </div>
                    <div className={styles.contactMethods}>
                        <div className={styles.method}>
                            <FaEnvelope className={styles.icon} />
                            <div className={styles.methodInfo}>
                                <h3>{t.help.emailSupport}</h3>
                                <p>support@liderbazar.uz</p>
                            </div>
                        </div>
                        <div className={styles.method}>
                            <FaPhoneAlt className={styles.icon} />
                            <div className={styles.methodInfo}>
                                <h3>{t.help.phoneSupport}</h3>
                                <a href="tel:+998200054004" className={styles.phoneLink}>+998 (20) 005-40-04</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
