'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded: () => void;
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Fruits',
        image: '',
        description: '',
        specs: '{}'
    });

    const categories = ['Fruits', 'Vegetables', 'Drinks', 'Bread Products', 'Grains', 'Baby Diapers'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    // Hardcoded category ID mapping for MVP - ideally fetch from DB
                    categoryId: (categories.indexOf(formData.category) + 1).toString()
                }),
            });

            if (res.ok) {
                onProductAdded();
                onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        style={{
                            background: '#1c1c21', width: '100%', maxWidth: '600px',
                            borderRadius: '24px', padding: '2rem', position: 'relative',
                            border: '1px solid rgba(255,255,255,0.08)',
                            maxHeight: '90vh', overflowY: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ color: '#fff', margin: 0 }}>Add New Product</h2>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontSize: '1.2rem' }}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#86868b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Product Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                        color: '#fff', outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#86868b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Price (UZS)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        style={{
                                            width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                            color: '#fff', outline: 'none'
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#86868b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        style={{
                                            width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                            color: '#fff', outline: 'none'
                                        }}
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#86868b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Image URL</label>
                                <div style={{ position: 'relative' }}>
                                    <FaCloudUploadAlt style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                                    <input
                                        required
                                        placeholder="https://..."
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        style={{
                                            width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                            color: '#fff', outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#86868b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                        color: '#fff', outline: 'none', resize: 'vertical'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: '1rem',
                                    background: 'linear-gradient(135deg, #ff9f0a 0%, #f59e0b 100%)',
                                    color: '#fff', padding: '1rem', borderRadius: '14px',
                                    fontWeight: '600', border: 'none', cursor: loading ? 'wait' : 'pointer',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {loading ? <><FaSpinner className="spin" /> Saving...</> : 'Create Product'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
