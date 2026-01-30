'use client';

import React from 'react';
import { FaHistory, FaCheckCircle, FaClock, FaArrowLeft } from 'react-icons/fa';
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

const CustomerMap = dynamic(() => import('@/components/CustomerMap'), { ssr: false });
import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';

export default function OrderHistory() {
    const router = useRouter();
    const [trackingId, setTrackingId] = React.useState<string | null>(null);

    return (
        <div className={styles.container}>
            <div className={`${styles.card} glass`}>
                <div className={styles.header}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', marginRight: '1rem', color: 'var(--foreground)' }}>
                        <FaArrowLeft />
                    </button>
                    <FaHistory className={styles.icon} />
                    <h1>Buyurtmalar Tarixi</h1>
                </div>

                {trackingId && (
                    <div className="mb-4">
                        <button onClick={() => setTrackingId(null)} className="text-sm text-gray-500 underline mb-2">Close Map</button>
                        <CustomerMap orderId={trackingId.replace('#', '')} />
                    </div>
                )}

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
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <p className={styles.items}>{order.items.join(', ')}</p>
                                        <p className={styles.total}>{formatPrice(order.total)}</p>
                                    </div>
                                    {order.status !== 'Bajarildi' && (
                                        <button
                                            onClick={() => setTrackingId(order.id)}
                                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            🗺️ Kuzatish
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
