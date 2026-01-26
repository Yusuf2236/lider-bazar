'use client';

import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
    trendType?: 'up' | 'down';
}

export default function StatCard({ title, value, icon, trend, trendType }: StatCardProps) {
    return (
        <div className={`${styles.card} glass`}>
            <div className={styles.iconWrapper}>{icon}</div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.value}>{value}</p>
                {trend && (
                    <span className={`${styles.trend} ${styles[trendType || 'up']}`}>
                        {trendType === 'up' ? '↑' : '↓'} {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
