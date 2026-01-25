'use client';

import React from 'react';
import { FaHistory, FaCheckCircle, FaClock } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import styles from './history.module.css';

// Mock orders for now
const mockOrders = [
    {
        id: '#1284',
        date: '25.01.2026',
        status: 'Bajarildi',
        items: ['Apple iPhone 15 Pro', 'G\'ilof'],
        total: 14650000
    },
    {
        id: '#1192',
        date: '20.01.2026',
        status: 'Kutilmoqda',
        items: ['Non', 'Sut'],
        total: 25000
    }
];

export default function OrderHistory() {
    return (
        <div className={styles.container}>
            <div className={`${styles.card} glass`}>
                <div className={styles.header}>
                    <FaHistory className={styles.icon} />
                    <h1>Buyurtmalar Tarixi</h1>
                </div>

                <div className={styles.ordersList}>
                    {mockOrders.map((order) => (
                        <div key={order.id} className={styles.orderItem}>
                            <div className={styles.orderTop}>
                                <span className={styles.orderId}>{order.id}</span>
                                <span className={styles.orderDate}>{order.date}</span>
                                <span className={`${styles.status} ${order.status === 'Bajarildi' ? styles.statusDone : styles.statusPending}`}>
                                    {order.status === 'Bajarildi' ? <FaCheckCircle /> : <FaClock />}
                                    {order.status}
                                </span>
                            </div>
                            <div className={styles.orderBody}>
                                <p className={styles.items}>{order.items.join(', ')}</p>
                                <p className={styles.total}>{formatPrice(order.total)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
