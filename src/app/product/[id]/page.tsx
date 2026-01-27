'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaCheckCircle, FaUser } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import styles from './product.module.css';

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const { addToast } = useToast();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState<any[]>([]);

    // Review State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
                // Fetch related products (mock logic: same category)
                if (data.category?.slug) {
                    fetchRelated(data.category.slug);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelated = async (categorySlug: string) => {
        try {
            // Exclude current product logic handles on client or ignored for now
            const res = await fetch(`/api/products?category=${categorySlug}`);
            if (res.ok) {
                const data = await res.json();
                // Filter out current product and limit to 4
                setRelated(data.filter((p: any) => p.id !== id).slice(0, 4));
            }
        } catch (error) {
            console.error('Failed to fetch related', error);
        }
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            addToast('Please login to review', 'error');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: id, rating, comment })
            });

            if (res.ok) {
                addToast('Review submitted!', 'success');
                setComment('');
                fetchProduct(); // Refresh reviews
            } else if (res.status === 409) {
                addToast('You already reviewed this product', 'error');
            } else {
                addToast('Failed to submit review', 'error');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: '4rem' }}><Skeleton height={500} /></div>;
    if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Product not found</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div className={styles.grid}>
                {/* Image Gallery */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                </motion.div>

                {/* Info */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2rem', color: '#FF9F0A', fontWeight: 'bold' }}>{formatPrice(product.price)}</span>
                        {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#888' }}>{formatPrice(product.oldPrice)}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <button
                            onClick={() => addToCart(product)}
                            style={{
                                flex: 1, padding: '1rem', borderRadius: '16px', border: 'none',
                                background: '#fff', color: '#000', fontSize: '1.2rem', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
                            }}
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>

                    <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px' }}>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Description</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6' }}>{product.description || 'No description available.'}</p>
                    </div>

                    {product.specs && (
                        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px' }}>
                            <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Specifications</h3>
                            {JSON.parse(product.specs).map((spec: any, i: number) => (
                                // Mock parsing assuming string or object, adjusting for MVP
                                <div key={i}>Spec {i}</div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Schema.org for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "image": product.image,
                        "description": product.description || `Buy ${product.name} at Lider Bazar`,
                        "sku": product.id,
                        "offers": {
                            "@type": "Offer",
                            "url": typeof window !== 'undefined' ? window.location.href : '',
                            "priceCurrency": "UZS",
                            "price": product.price,
                            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        },
                        "aggregateRating": product.reviews.length > 0 ? {
                            "@type": "AggregateRating",
                            "ratingValue": product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length,
                            "reviewCount": product.reviews.length
                        } : undefined
                    })
                }}
            />
        </div>

            {/* Related Products */ }
    {
        related.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>You may also like</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {related.map((p) => (
                        <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: 'var(--card-bg)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', height: '100%' }}>
                                <div style={{ position: 'relative', height: '200px' }}>
                                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                                    <div style={{ color: '#FF9F0A', fontWeight: 'bold' }}>{formatPrice(p.price)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    {/* Reviews Section */ }
    <div style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Reviews ({product.reviews.length})</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem' }}>
            {/* Write Review */}
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1rem' }}>Write a Review</h3>
                <form onSubmit={submitReview}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rating</label>
                        <div style={{ display: 'flex', gap: '0.5rem', color: '#FF9F0A', fontSize: '1.5rem', cursor: 'pointer' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <FaStar key={star} onClick={() => setRating(star)} style={{ opacity: star <= rating ? 1 : 0.3 }} />
                            ))}
                        </div>
                    </div>
                    <textarea
                        required
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: '#fff', minHeight: '100px', marginBottom: '1rem' }}
                    />
                    <button type="submit" disabled={submitting} style={{ width: '100%', padding: '1rem', background: '#FF9F0A', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Submitting...' : 'Post Review'}
                    </button>
                </form>
            </div>

            {/* Review List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {product.reviews.map((review: any) => (
                    <div key={review.id} style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {review.user.image ? <Image src={review.user.image} alt={review.user.name} width={40} height={40} /> : <FaUser />}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{review.user.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', color: '#FF9F0A' }}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} style={{ opacity: i < review.rating ? 1 : 0.3 }} />
                                ))}
                            </div>
                        </div>
                        <p style={{ color: '#ccc', lineHeight: '1.5' }}>{review.comment}</p>
                    </div>
                ))}
                {product.reviews.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No reviews yet. Be the first!</div>
                )}
            </div>
        </div>
    </div>
        </div >
    );
}
