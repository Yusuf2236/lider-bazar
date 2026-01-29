'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaBoxOpen, FaShoppingCart, FaUsers, FaSync } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
            background: '#1c1c21',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flex: 1,
            minWidth: '240px'
        }}
    >
        <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: `${color}20`, color: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: '#86868b', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{title}</p>
            <h3 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: '700' }}>{value}</h3>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const [syncing, setSyncing] = useState(false);
    const [syncResult, setSyncResult] = useState<{ success?: boolean, message?: string } | null>(null);

    const handleSync = async () => {
        setSyncing(true);
        setSyncResult(null);
        try {
            const res = await fetch('/api/admin/sync-products', { method: 'POST' });
            const data = await res.json();

            if (res.ok) {
                setSyncResult({ success: true, message: data.message });
            } else {
                setSyncResult({ success: false, message: data.message || "Sync failed" });
            }
        } catch (error) {
            setSyncResult({ success: false, message: "Network error during sync" });
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
                    <p style={{ color: '#86868b' }}>Welcome back, Admin. Here's what's happening.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {syncResult && (
                        <span style={{
                            color: syncResult.success ? '#32d74b' : '#ff3b30',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            {syncResult.message}
                        </span>
                    )}
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem 1.5rem',
                            background: syncing ? '#3a3a3c' : 'linear-gradient(135deg, #0a84ff, #5e5ce6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: syncing ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(10, 132, 255, 0.3)'
                        }}
                    >
                        <FaSync className={syncing ? 'spin' : ''} />
                        {syncing ? 'Syncing...' : 'Sync YesPos'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <StatCard title="Total Revenue" value="$45,231" icon={<FaDollarSign />} color="#32d74b" />
                <StatCard title="Total Orders" value="1,205" icon={<FaShoppingCart />} color="#0a84ff" />
                <StatCard title="Products" value="142" icon={<FaBoxOpen />} color="#ff9f0a" />
                <StatCard title="Customers" value="894" icon={<FaUsers />} color="#bf5af2" />
            </div>

            <div style={{
                background: '#1c1c21', borderRadius: '24px', padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Orders</h3>
                <div style={{ color: '#86868b', textAlign: 'center', padding: '2rem 0' }}>
                    No recent orders found.
                </div>
            </div>
        </div>
    );
}
