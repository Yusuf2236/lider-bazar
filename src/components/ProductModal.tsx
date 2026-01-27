'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaTimes, FaCircle, FaCcVisa, FaCcMastercard, FaWallet, FaCheckCircle } from 'react-icons/fa';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedContent } from '@/lib/i18n-utils';
import styles from './ProductModal.module.css';

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const { t, locale } = useLanguage();

    const localizedName = getLocalizedContent(product, locale, 'name');
    const localizedDescription = getLocalizedContent(product, locale, 'description');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.headerTitle}>{t.modal.details}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.body}>
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.image}
                                alt={localizedName}
                                fill
                                className={styles.image}
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h3 className={styles.productName}>{localizedName}</h3>

                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.round(product.rating) ? styles.starFilled : styles.starEmpty} />
                                ))}
                            </div>
                            <span className={styles.ratingValue}>({product.rating} / 5)</span>
                        </div>

                        <div className={styles.priceWrapper}>
                            <span className={styles.price}>{new Intl.NumberFormat('en-US', { style: 'decimal' }).format(product.price / 1000)}k <span className={styles.currency}>UZS</span></span>
                            {/* Note: Formatting 25000 as 25k to match reference image style */}
                        </div>

                        <div className={styles.description}>
                            <h4>{t.modal.description}</h4>
                            <p>{localizedDescription || t.modal.defaultDescription}</p>

                            {product.specs && (
                                <div className={styles.specsContainer}>
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className={styles.specRow}>
                                            <span className={styles.specKey}>{key}:</span>
                                            <span className={styles.specValue}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.stockStatus}>
                            <FaCircle className={styles.stockDot} />
                            <span>{t.products.inStock}</span>
                        </div>

                        <div className={styles.paymentMethods}>
                            <h4>{t.modal.paymentMethods}</h4>
                            <div className={styles.methodsGrid}>
                                <div className={styles.methodCard}><FaWallet /> Payme</div>
                                <div className={styles.methodCard}><span style={{ color: '#ff6600' }}>●</span> Click</div>
                                <div className={styles.methodCard}><span style={{ color: '#7000ff' }}>●</span> Uzum</div>
                                <div className={styles.methodCard}><FaCcVisa /> Visa</div>
                                <div className={styles.methodCard}><FaCcMastercard /> Mastercard</div>
                            </div>
                        </div>

                        <button
                            className={styles.addToCartButton}
                            onClick={() => {
                                addToCart(product);
                                // onClose(); // Optional: close on add
                            }}
                        >
                            <FaCheckCircle className={styles.btnIcon} /> {t.modal.addToCart}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
