'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.css';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Search() {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
                <span className={styles.searchIconLeft}>
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder={t.header.searchPlaceholder}
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
            </div>

            {isFocused && query.length > 0 && (
                <div className={styles.suggestions}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className={styles.suggestionItem}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className={styles.productImage}
                                        unoptimized
                                    />
                                </div>
                                <div className={styles.productInfo}>
                                    <p className={styles.productName}>{product.name}</p>
                                    <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.noResults}>{t.header.noResults}</div>
                    )}
                </div>
            )}
        </div>
    );
}
