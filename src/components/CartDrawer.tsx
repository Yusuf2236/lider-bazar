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

import { useRouter } from 'next/navigation';

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const { t } = useLanguage();
    const router = useRouter();

    const handleCheckout = () => {
        if (cart.length === 0) return;
        onClose();
        router.push('/checkout');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <FaShoppingBag className={styles.bagIcon} />
                        <p className="text-gray-500">Savat bo&apos;sh</p>
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
                                        <p className="text-sm font-medium">{item.price.toLocaleString()} so&apos;m</p>
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
