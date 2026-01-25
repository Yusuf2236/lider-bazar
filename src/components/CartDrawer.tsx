'use client';

import React from 'react';
import { FaTimes, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const { t } = useLanguage();

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const newOrder = {
            id: `#${Math.floor(1000 + Math.random() * 9000)}`,
            customer: 'Yusuf (Mijoz)',
            date: new Date().toLocaleString(),
            total: totalPrice,
            status: 'Yangi',
            items: cart.length
        };

        // Simulate "Database" update for Admin Panel
        const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        localStorage.setItem('admin_orders', JSON.stringify([newOrder, ...existingOrders]));

        alert('Buyurtmangiz muvaffaqiyatli qabul qilindi! Admin panelda ko\'rishingiz mumkin.');
        onClose();
        // Clear cart after checkout
        cart.forEach(item => removeFromCart(item.id));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <FaShoppingBag className={styles.bagIcon} />
                        <h2 className={styles.title}>Savatcha</h2>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.content}>
                    {cart.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>Savatchangiz bo'sh</p>
                        </div>
                    ) : (
                        <div className={styles.itemsList}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image src={item.image} alt={item.name} fill unoptimized />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                                        <div className={styles.quantityControls}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Umumiy:</span>
                            <span className={styles.totalAmount}>{formatPrice(totalPrice)}</span>
                        </div>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            To'lov va Buyurtma Berish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
