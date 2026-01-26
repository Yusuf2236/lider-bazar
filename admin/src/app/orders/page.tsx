'use client';

import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaTruck, FaFilter, FaSearch } from 'react-icons/fa';
import styles from './orders.module.css';

const defaultOrders = [
    { id: '#1286', customer: 'Yusuf', date: 'Bugun, 18:50', total: 14500000, status: 'Yangi', items: 1 },
    { id: '#1285', customer: 'Olim', date: 'Bugun, 17:30', total: 250000, status: 'To\'landi', items: 3 },
    { id: '#1284', customer: 'Jasur', date: 'Kecha', total: 85000, status: 'Yetkazilmoqda', items: 1 },
    { id: '#1283', customer: 'Anvar', date: 'Kecha', total: 1200000, status: 'Bajarildi', items: 2 },
];

export default function AdminOrders() {
    const [orders, setOrders] = useState(defaultOrders);

    useEffect(() => {
        // Real and Mock sync logic
        const fetchOrders = () => {
            const realOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
            if (realOrders.length > 0) {
                setOrders([...realOrders, ...defaultOrders]);
            } else {
                setOrders(defaultOrders); // If no real orders, use default
            }
        };

        fetchOrders();
        // Refresh every 5 seconds for simulation
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Yangi': return styles.statusNew;
            case 'To\'landi': return styles.statusPaid;
            case 'Yetkazilmoqda': return styles.statusShipping;
            case 'Bajarildi': return styles.statusDone;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Buyurtmalar <span className={styles.highlight}>Boshqaruvi</span></h1>
                    <p className={styles.subtitle}>Barcha kelgan buyurtmalarni kuzatib boring va holatni yangilang.</p>
                </div>
            </header>

            <div className={`${styles.actionBar} glass`}>
                <div className={styles.searchBox}>
                    <FaSearch />
                    <input type="text" placeholder="Buyurtma ID yoki mijoz..." />
                </div>
                <div className={styles.filters}>
                    <button className={styles.filterBtn}><FaFilter /> Status</button>
                    <button className={styles.filterBtn}>Sana</button>
                </div>
            </div>

            <section className={`${styles.tableWrapper} glass`}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mijoz</th>
                            <th>Sana</th>
                            <th>Jami</th>
                            <th>Status</th>
                            <th>Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className={styles.orderId}>{order.id}</td>
                                <td className={styles.customer}>{order.customer}</td>
                                <td>{order.date}</td>
                                <td className={styles.total}>{order.total.toLocaleString()} so'm</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.actionBtn} title="Ko'rish"><FaEye /></button>
                                    <button className={styles.actionBtn} title="Tasdiqlash"><FaCheck /></button>
                                    <button className={styles.actionBtn} title="Yetkazish"><FaTruck /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
