'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.css';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import debounce from 'lodash/debounce';

export default function Search() {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    // Create a debounced fetch function
    const performSearch = useCallback(
        debounce(async (searchQuery: string) => {
            if (searchQuery.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`/api/products?q=${encodeURIComponent(searchQuery)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data);
                }
            } catch (error) {
                console.error('Search failed', error);
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        performSearch(query);
    }, [query, performSearch]);

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
                    {loading ? (
                        <div className={styles.noResults}>Searching...</div>
                    ) : results.length > 0 ? (

                        results.map((product) => (
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
