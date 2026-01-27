'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import styles from './reports.module.css';

export default function ReportsPage() {
    return (
        <div className={styles.reports}>
            <header className={styles.header}>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>Sales <span className={styles.highlight}>Reports</span></h1>
                    <p className={styles.subtitle}>Analyze your business performance and sales trends.</p>
                </div>
                <button className={styles.downloadBtn}>
                    <FaDownload /> Export PDF
                </button>
            </header>

            <section className={styles.statsGrid}>
                <div className={`${styles.statCard} glass`}>
                    <div className={styles.statHeader}>
                        <span>Net Revenue</span>
                        <FaChartLine />
                    </div>
                    <div className={styles.statValue}>45 200 000 so'm</div>
                    <div className={`${styles.statTrend} ${styles.up}`}>
                        <FaArrowUp /> 12.5% vs last month
                    </div>
                </div>

                <div className={`${styles.statCard} glass`}>
                    <div className={styles.statHeader}>
                        <span>Average Order Value</span>
                        <FaChartLine />
                    </div>
                    <div className={styles.statValue}>125 000 so'm</div>
                    <div className={`${styles.statTrend} ${styles.up}`}>
                        <FaArrowUp /> 4.2% vs last month
                    </div>
                </div>

                <div className={`${styles.statCard} glass`}>
                    <div className={styles.statHeader}>
                        <span>Conversion Rate</span>
                        <FaChartLine />
                    </div>
                    <div className={styles.statValue}>3.4%</div>
                    <div className={`${styles.statTrend} ${styles.down}`}>
                        <FaArrowDown /> 0.8% vs last month
                    </div>
                </div>
            </section>

            <section className={`${styles.chartSection} glass`}>
                <div className={styles.sectionHeader}>
                    <h2>Monthly Sales Growth</h2>
                </div>
                <div className={styles.placeholderChart}>
                    {/* Placeholder for a real chart library like Recharts */}
                    <div className={styles.bars}>
                        {[40, 60, 45, 80, 55, 90, 70, 85, 65, 95, 80, 100].map((h, i) => (
                            <div key={i} className={styles.bar} style={{ height: `${h}%` }}>
                                <span className={styles.barLabel}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
