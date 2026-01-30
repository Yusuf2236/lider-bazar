'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedContent } from '@/lib/i18n-utils';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from './ProductModal';
import styles from './ProductCard.module.css';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const { locale } = useLanguage();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isWishlisted = isInWishlist(product.id);

    const localizedName = getLocalizedContent(product, locale, 'name');

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        addToast(`${localizedName} added to cart!`);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <>
            <motion.div
                className={styles.card}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <button
                    className={styles.wishlistButton}
                    onClick={handleToggleWishlist}
                    aria-label="Toggle Wishlist"
                >
                    {isWishlisted ? <FaHeart className={styles.heartFilled} /> : <FaRegHeart />}
                </button>

                {product.oldPrice && (
                    <span className={styles.discountBadge}>
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                )}
                <div className={styles.imageLink} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <div className={styles.imageWrapper}>
                        <motion.div
                            animate={isHovered ? { y: [-5, 5, -5] } : { y: 0 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <Image
                                src={product.image}
                                alt={localizedName}
                                fill
                                className={styles.image}
                                unoptimized
                            />
                        </motion.div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.title} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                        {localizedName}
                    </div>
                    <div className={styles.rating}>
                        {'★'.repeat(Math.round(product.rating))}
                        <span className={styles.ratingValue}>({product.rating})</span>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.priceInfo}>
                            {product.oldPrice && <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>}
                            <span className={styles.price}>{formatPrice(product.price)}</span>
                        </div>
                        <motion.button
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            aria-label="Savatchaga qo'shish"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-orange)', color: 'white' }}
                        >
                            <FaShoppingCart />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
