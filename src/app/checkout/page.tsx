'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';

import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { data: session } = useSession();
    const { t } = useLanguage(); // Translation hook
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [detectingLocation, setDetectingLocation] = useState(false);

    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        location: '', // Coordinates
        paymentMethod: 'cash' // 'cash' | 'card'
    });

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert(t.checkout.locationError);
            return;
        }

        setDetectingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Create Google Maps link
                const locString = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setFormData(prev => ({ ...prev, location: locString }));
                setDetectingLocation(false);
            },
            (error) => {
                console.error(error);
                let msg = t.checkout.locationError;
                if (error.code === 1) msg = "Permission denied. Please allow location access.";
                else if (error.code === 2) msg = "Position unavailable. check GPS.";
                else if (error.code === 3) msg = "Timeout.";

                alert(msg);
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
                clearCart();
                router.push('/profile'); // Redirect to order history
            } else {
                const errorText = await res.text();
                alert(`Error: ${errorText || 'Failed to place order.'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

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
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>{t.checkout.title}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaMapMarkerAlt style={{ color: '#FF9F0A' }} /> {t.checkout.deliveryDetails}
                    </h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Geolocation Button */}
                        <div style={{ marginBottom: '1rem' }}>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={detectingLocation}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)',
                                    background: 'rgba(50, 215, 75, 0.1)', color: '#32d74b', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}
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
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)',
                                    background: 'rgba(0,0,0,0.2)', color: 'var(--foreground)', fontSize: '1rem', outline: 'none'
                                }}
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
                                    style={{
                                        width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: '1px solid var(--border)',
                                        background: 'rgba(0,0,0,0.2)', color: 'var(--foreground)', fontSize: '1rem', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>{t.checkout.paymentMethod}</label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '12px', border: `1px solid ${formData.paymentMethod === 'cash' ? '#32d74b' : 'var(--border)'}`,
                                        background: formData.paymentMethod === 'cash' ? 'rgba(50, 215, 75, 0.1)' : 'rgba(0,0,0,0.2)',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px'
                                    }}
                                >
                                    <FaMoneyBillWave style={{ color: '#32d74b' }} />
                                    <span>{t.checkout.cashOnDelivery}</span>
                                    {formData.paymentMethod === 'cash' && <FaCheckCircle style={{ marginLeft: 'auto', color: '#32d74b' }} />}
                                </div>
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '12px', border: `1px solid ${formData.paymentMethod === 'card' ? '#FF9F0A' : 'var(--border)'}`,
                                        background: formData.paymentMethod === 'card' ? 'rgba(255, 159, 10, 0.1)' : 'rgba(0,0,0,0.2)',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px'
                                    }}
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
                            style={{
                                marginTop: '1rem',
                                background: 'linear-gradient(135deg, #32d74b 0%, #28c840 100%)',
                                color: '#fff', padding: '1.2rem', borderRadius: '16px',
                                fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: loading ? 'wait' : 'pointer',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 20px rgba(50, 215, 75, 0.3)'
                            }}
                        >
                            {loading ? <FaSpinner className="spin" /> : <><FaCheckCircle /> {t.checkout.confirmOrder}</>}
                        </button>
                    </form>
                </motion.div>

                {/* Cart Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', height: 'fit-content' }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t.checkout.yourOrder}</h2>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden' }}>
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
