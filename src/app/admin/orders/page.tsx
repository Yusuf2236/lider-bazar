'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaUser, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import Skeleton from '@/components/ui/Skeleton';

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: {
        name: string;
        image: string;
    };
}

interface Order {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
    address?: string;
    phone?: string;
}

const statusColors: { [key: string]: string } = {
    PENDING: '#ff9f0a',
    PROCESSING: '#0a84ff',
    COMPLETED: '#32d74b',
    CANCELLED: '#ff453a',
};

const statusIcons: { [key: string]: React.ReactNode } = {
    PENDING: <FaClock />,
    PROCESSING: <FaBox />,
    COMPLETED: <FaCheckCircle />,
    CANCELLED: <FaTimesCircle />,
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Orders</h1>
                <p style={{ color: '#86868b' }}>Manage customer orders</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} style={{ background: '#1c1c21', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <Skeleton width={48} height={48} borderRadius={12} />
                                <div style={{ flex: 1 }}>
                                    <Skeleton width={120} height={20} className="mb-2" />
                                    <Skeleton width={180} height={14} />
                                </div>
                            </div>
                            <Skeleton height={60} />
                        </div>
                    ))
                ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#86868b', padding: '3rem', background: '#1c1c21', borderRadius: '20px' }}>
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: '#1c1c21',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: '1.2rem'
                                    }}>
                                        <FaBox />
                                    </div>
                                    <div>
                                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Order #{order.id.slice(-6).toUpperCase()}</h3>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#86868b', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                            <FaUser size={12} /> {order.user?.name || 'Guest'} • {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.5rem 1rem', borderRadius: '12px',
                                        background: `${statusColors[order.status] || '#86868b'}20`,
                                        color: statusColors[order.status] || '#86868b',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem'
                                    }}>
                                        {statusIcons[order.status]} {order.status}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            {order.total.toLocaleString()} UZS
                                        </div>
                                        <div style={{ color: '#86868b', fontSize: '0.85rem' }}>
                                            {order.items.length} items
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem' }}>
                                {order.items.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <span style={{ color: '#ccc' }}>{item.quantity}x {item.product.name}</span>
                                        <span style={{ color: '#fff' }}>{(item.price * item.quantity).toLocaleString()} UZS</span>
                                    </div>
                                ))}
                                {(order.address || order.phone) && (
                                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#86868b', fontSize: '0.9rem' }}>
                                        <p>📍 {order.address || 'No address'}</p>
                                        <p>📞 {order.phone || 'No phone'}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
