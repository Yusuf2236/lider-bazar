'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import AddProductModal from '@/components/admin/AddProductModal';
import Skeleton from '@/components/ui/Skeleton';

interface Product {
    id: string;
    name: string;
    price: number;
    category: { name: string };
    image: string;
    stock: number;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true); // Optional: show loading on refresh
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        // In real app: await fetch(`/api/products/${id}`, { method: 'DELETE' });
        alert('Delete functionality to be implemented in API');
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={fetchProducts}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Products</h1>
                    <p style={{ color: '#86868b' }}>Manage your product catalog</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: '#ff9f0a', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '12px',
                        border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}
                >
                    <FaPlus /> Add Product
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%', maxWidth: '400px', padding: '0.8rem 1rem 0.8rem 3rem',
                        background: '#1c1c21', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                        color: '#fff', outline: 'none'
                    }}
                />
            </div>

            <div style={{ background: '#1c1c21', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                            <th style={{ padding: '1.2rem', color: '#86868b', fontWeight: '500' }}>Product</th>
                            <th style={{ padding: '1.2rem', color: '#86868b', fontWeight: '500' }}>Category</th>
                            <th style={{ padding: '1.2rem', color: '#86868b', fontWeight: '500' }}>Price</th>
                            <th style={{ padding: '1.2rem', color: '#86868b', fontWeight: '500' }}>Stock</th>
                            <th style={{ padding: '1.2rem', color: '#86868b', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // Render 5 skeleton rows
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Skeleton width={48} height={48} borderRadius={8} />
                                        <Skeleton width={120} />
                                    </td>
                                    <td style={{ padding: '1rem' }}><Skeleton width={80} /></td>
                                    <td style={{ padding: '1rem' }}><Skeleton width={60} /></td>
                                    <td style={{ padding: '1rem' }}><Skeleton width={50} /></td>
                                    <td style={{ padding: '1rem' }}><div style={{ display: 'flex', gap: '0.8rem' }}><Skeleton width={20} /><Skeleton width={20} /></div></td>
                                </tr>
                            ))
                        ) : filteredProducts.map((product) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#333' }}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <span style={{ fontWeight: '500' }}>{product.name}</span>
                                </td>
                                <td style={{ padding: '1rem', color: '#a1a1a6' }}>{product.category?.name}</td>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{product.price.toLocaleString()} UZS</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem',
                                        background: product.stock > 10 ? 'rgba(50, 215, 75, 0.1)' : 'rgba(255, 69, 58, 0.1)',
                                        color: product.stock > 10 ? '#32d74b' : '#ff453a'
                                    }}>
                                        {product.stock} in stock
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#0a84ff', cursor: 'pointer', fontSize: '1.1rem' }}><FaEdit /></button>
                                        <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.1rem' }}><FaTrash /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
