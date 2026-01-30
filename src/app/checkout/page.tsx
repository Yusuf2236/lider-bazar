'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';

import { useLanguage } from '@/context/LanguageContext';

import styles from './checkout.module.css';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { data: session, status } = useSession();
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [detectingLocation, setDetectingLocation] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        location: '',
        paymentMethod: 'cash'
    });

    React.useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/checkout');
        }
    }, [status, router]);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            return;
        }

        setDetectingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locString = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setFormData(prev => ({ ...prev, location: locString }));
                setDetectingLocation(false);
            },
            (error) => {
                setDetectingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!session) {
            router.push('/login?callbackUrl=/checkout');
            return;
        }

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: cartTotal,
                    address: formData.address,
                    phone: formData.phone,
                    location: formData.location,
                    paymentMethod: formData.paymentMethod
                }),
            });

            if (res.ok) {
                const data = await res.json();

                if (data.payment && data.payment.payment_url) {
                    window.location.href = data.payment.payment_url;
                } else if (data.order) {
                    clearCart();
                    router.push('/profile');
                } else {
                    console.error("Unknown response structure", data);
                    alert("Order created but response was unexpected. check profile.");
                    router.push('/profile');
                }

                if (res.status === 401) {
                    signOut({ callbackUrl: '/login' });
                    return;
                }
            } else {
                const err = await res.text();
                // Handle specific errors
                if (err.includes("Selected products no longer exist")) {
                    alert("Savatingizdagi mahsulotlar ma'lumotlari yangilangan. Iltimos, savatni tozalab, mahsulotlarni qaytadan tanlang.");
                    clearCart();
                    router.push('/catalog');
                    return;
                }
                alert("Order failed: " + err);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><FaSpinner className="spin" size={40} /></div>;
    }

    if (cart.length === 0) {
        return (
            <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.header.noResults}</h2>
                <button onClick={() => router.push('/catalog')} style={{ background: '#FF9F0A', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '12px', fontSize: '1.1rem', cursor: 'pointer' }}>
                    {t.header.catalog}
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t.checkout.title}</h1>

            <div className={styles.grid}>
                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={styles.card}
                >
                    <h2 className={styles.cardHeader}>
                        <FaMapMarkerAlt style={{ color: '#FF9F0A' }} /> {t.checkout.deliveryDetails}
                    </h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Geolocation Button */}
                        <div className={styles.inputGroup}>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={detectingLocation}
                                className={styles.locationBtn}
                            >
                                {detectingLocation ? <FaSpinner className="spin" /> : <FaMapMarkerAlt />}
                                {detectingLocation ? t.checkout.detectingLocation : formData.location ? t.checkout.locationDetected : t.checkout.getLocation}
                            </button>
                            {formData.location && <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', textAlign: 'center' }}>{formData.location}</div>}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>{t.checkout.fullAddress}</label>
                            <textarea
                                required
                                rows={3}
                                placeholder="..."
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className={styles.input}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>{t.checkout.phone}</label>
                            <div style={{ position: 'relative' }}>
                                <FaPhone style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                                <input
                                    required
                                    type="tel"
                                    placeholder="+998 90 123 45 67"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className={`${styles.input} ${styles.inputWithIcon}`}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>{t.checkout.paymentMethod}</label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                                    className={`${styles.paymentOption} ${formData.paymentMethod === 'cash' ? styles.activeCash : ''}`}
                                >
                                    <FaMoneyBillWave style={{ color: '#32d74b' }} />
                                    <span>{t.checkout.cashOnDelivery}</span>
                                    {formData.paymentMethod === 'cash' && <FaCheckCircle style={{ marginLeft: 'auto', color: '#32d74b' }} />}
                                </div>
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                                    className={`${styles.paymentOption} ${formData.paymentMethod === 'card' ? styles.activeCard : ''}`}
                                >
                                    <FaMoneyBillWave style={{ color: '#FF9F0A' }} />
                                    <span>Card (Click/Payme)</span>
                                    {formData.paymentMethod === 'card' && <FaCheckCircle style={{ marginLeft: 'auto', color: '#FF9F0A' }} />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitBtn}
                        >
                            {loading ? <FaSpinner className="spin" /> : <><FaCheckCircle /> {t.checkout.confirmOrder}</>}
                        </button>
                    </form>
                </motion.div>

                {/* Cart Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={styles.card}
                    style={{ height: 'fit-content' }}
                >
                    <h2 className={styles.cardHeader} style={{ marginBottom: '1.5rem' }}>{t.checkout.yourOrder}</h2>
                    <div className={styles.summaryScroll}>
                        {cart.map(item => (
                            <div key={item.id} className={styles.summaryItem}>
                                <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '500' }}>{item.name}</p>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>{item.quantity} x {formatPrice(item.price)}</p>
                                </div>
                                <div style={{ fontWeight: 'bold' }}>
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            <span>{t.checkout.subtotal}</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            <span>{t.checkout.delivery}</span>
                            <span style={{ color: '#32d74b' }}>{t.checkout.free}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            <span>{t.checkout.total}</span>
                            <span style={{ color: '#FF9F0A' }}>{formatPrice(cartTotal)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
