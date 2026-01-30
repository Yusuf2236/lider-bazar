'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Skeleton from '@/components/ui/Skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

import { useRouter } from 'next/navigation';

export default function WishlistPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchWishlist();
        }
    }, [session]);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                setWishlist(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        setWishlist(prev => prev.filter(item => item.product.id !== productId)); // Optimistic UI
        try {
            await fetch(`/api/wishlist?productId=${productId}`, { method: 'DELETE' });
        } catch (error) {
            console.error('Failed to remove', error);
        }
    };

    if (!session) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <h2>Please login to view your wishlist</h2>
                <Link href="/login" style={{ display: 'inline-block', marginTop: '1rem', color: '#FF9F0A' }}>Login</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', marginBottom: '1rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaArrowLeft /> Back
            </button>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaHeart style={{ color: '#FF3B30' }} /> My Wishlist
            </h1>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                            <Skeleton height={200} borderRadius={12} className="mb-4" />
                            <Skeleton height={20} width="80%" className="mb-2" />
                            <Skeleton height={20} width="40%" />
                        </div>
                    ))}
                </div>
            ) : wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#888' }}>
                    <FaHeart size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                    <p>Your wishlist is empty.</p>
                    <Link href="/catalog" style={{ display: 'inline-block', marginTop: '1rem', color: '#FF9F0A' }}>Browse Products</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {wishlist.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: '20px',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => removeFromWishlist(item.product.id)}
                                style={{
                                    position: 'absolute', top: '10px', right: '10px', zIndex: 2,
                                    background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none',
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }}
                            >
                                <FaTrash size={14} />
                            </button>

                            <Link href={`/catalog/${item.product.id}`} style={{ display: 'block', position: 'relative', height: '220px' }}>
                                <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                            </Link>

                            <div style={{ padding: '1.5rem' }}>
                                <Link href={`/catalog/${item.product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</h3>
                                </Link>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FF9F0A' }}>{formatPrice(item.product.price)}</span>
                                    <button
                                        onClick={() => addToCart(item.product)}
                                        style={{
                                            background: 'var(--foreground)', color: 'var(--background)',
                                            border: 'none', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
