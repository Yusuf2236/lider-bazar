'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CheckoutForm.module.css';
import { FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
    const { cart, totalPrice, cartCount } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        lat: '',
        lng: ''
    });

    if (cartCount === 0) {
        return <div className={styles.empty}>Your cart is empty</div>;
    }

    const handleLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setFormData(prev => ({
                    ...prev,
                    lat: latitude.toString(),
                    lng: longitude.toString(),
                    // Simple logic to set a placeholder address or leave for user
                    address: prev.address || `GPS Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                }));
            },
            (error) => {
                alert('Unable to retrieve your location');
                console.error(error);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: totalPrice,
                    customerName: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    location: formData.lat ? `${formData.lat},${formData.lng}` : null
                })
            });

            if (res.ok) {
                alert('Order placed successfully!');
                // Clear cart logic would go here ideally
                router.push('/');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.summary}>
                <h2>Order Summary</h2>
                <div className={styles.items}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>{(item.price * item.quantity).toLocaleString()} sum</span>
                        </div>
                    ))}
                </div>
                <div className={styles.total}>
                    <span>Total:</span>
                    <span>{totalPrice.toLocaleString()} sum</span>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Delivery Details</h2>

                <div className={styles.field}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        required
                        className={styles.input}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>

                <div className={styles.field}>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        required
                        className={styles.input}
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998 90 123 45 67"
                    />
                </div>

                <div className={styles.field}>
                    <label>Address</label>
                    <textarea
                        required
                        className={styles.textarea}
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street, House number, Apartment..."
                    />
                </div>

                <div className={styles.locationSection}>
                    <button type="button" className={styles.locationBtn} onClick={handleLocation}>
                        <FaMapMarkerAlt /> Use My Geographical Location
                    </button>
                    {formData.lat && (
                        <div className={styles.mapPreview}>
                            <p className={styles.coordText}>Selected: {formData.lat}, {formData.lng}</p>
                            <iframe
                                width="100%"
                                height="200"
                                frameBorder="0"
                                style={{ border: 0, borderRadius: '12px' }}
                                src={`https://maps.google.com/maps?q=${formData.lat},${formData.lng}&hl=en&z=15&output=embed`}
                            ></iframe>
                        </div>
                    )}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Processing...' : <><FaPaperPlane /> Place Order</>}
                </button>
            </form>
        </div>
    );
}
