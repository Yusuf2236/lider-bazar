'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import ProductModal from './ProductModal';
import styles from './ProductCard.module.css';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        addToast(`${product.name} added to cart!`);
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        addToast(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist', 'info');
    };

    return (
        <>
            <div className={styles.card}>
                <button
                    className={styles.wishlistButton}
                    onClick={toggleWishlist}
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
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.title} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                        {product.name}
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
                        <button
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            aria-label="Savatchaga qo'shish"
                        >
                            <FaShoppingCart />
                        </button>
                    </div>
                </div>
            </div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
