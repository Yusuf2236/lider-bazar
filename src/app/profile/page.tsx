'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Skeleton from '@/components/ui/Skeleton';
import Image from 'next/image';
import { FaBox, FaUser, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchOrders();
        }
    }, [session]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null; // Middleware handles redirect

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Profile Widget */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ flex: '1', minWidth: '300px', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', height: 'fit-content' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #FF9F0A, #FF3B30)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>
                            {session.user?.name?.[0] || <FaUser />}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{session.user?.name}</h2>
                        <p style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaEnvelope /> {session.user?.email}</p>
                    </div>
                </motion.div>

                {/* Orders Widget */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ flex: '2', minWidth: '300px' }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FaBox style={{ color: '#FF9F0A' }} /> Order History
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                    <Skeleton width={150} height={20} className="mb-2" />
                                    <Skeleton width={100} height={15} />
                                </div>
                            ))
                        ) : orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <span style={{ fontWeight: '600' }}>Order #{order.id.slice(-6).toUpperCase()}</span>
                                            <div style={{ fontSize: '0.9rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                                                <FaClock /> {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', color: '#FF9F0A' }}>{order.total.toLocaleString()} UZS</div>
                                            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '12px', background: 'rgba(50, 215, 75, 0.1)', color: '#32d74b' }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                        {order.items.map((item: any) => (
                                            <div key={item.id} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
                                                <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#888', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                No orders yet.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
