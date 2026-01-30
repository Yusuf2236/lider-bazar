'use client';
export const dynamic = 'force-dynamic';

import { FaPlus, FaSearch, FaFilter, FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import styles from './products.module.css';
import { useState, useEffect } from 'react';
// import { useToast } from '@/context/ToastContext'; // Removed as it might not exist in admin

export default function ProductsPage() {
    const [productList, setProductList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        categoryName: 'General',
        stock: '100',
        description: '',
        image: ''
    });



    const fetchProducts = async () => {
        setFetching(true);
        try {
            // Local Admin API
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProductList(data);
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setFetching(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    const filteredProducts = productList.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            categoryName: product.category,
            stock: product.stock,
            description: product.description || '',
            image: product.image || ''
        });
        setShowModal(true);
    };

    const handleDeleteClick = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert("Product deleted!");
                fetchProducts();
            } else {
                alert("Failed to delete product");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting product");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const method = editingProduct ? 'PUT' : 'POST';
        const body = editingProduct ? { ...formData, id: editingProduct.id } : formData;

        try {
            const res = await fetch('/api/products', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(editingProduct ? "Product updated!" : "Product created!");
                setShowModal(false);
                setEditingProduct(null);
                setFormData({ name: '', price: '', categoryName: 'General', stock: '100', description: '', image: '' });
                fetchProducts();
            } else {
                alert("Failed to save product");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving product");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: '', categoryName: 'General', stock: '100', description: '', image: '' });
        setShowModal(true);
    };

    const [syncing, setSyncing] = useState(false);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch('/api/sync-yespos', { method: 'POST' });
            const data = await res.json();
            if (res.ok && data.success) {
                alert(`Sync successful! Categories: ${data.stats.categories}, Products: ${data.stats.products}`);
                fetchProducts();
            } else {
                alert('Sync failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            alert('Error syncing with YesPos');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Product <span className={styles.highlight}>Management</span></h1>
                    <p className={styles.subtitle}>Add, edit, and keep track of your product inventory.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={styles.addBtn}
                        onClick={handleSync}
                        disabled={syncing}
                        style={{ background: '#2196F3' }}
                    >
                        {syncing ? 'Syncing...' : 'Sync YesPos'}
                    </button>
                    <button className={styles.addBtn} onClick={openAddModal}>
                        <FaPlus /> Add New Product
                    </button>
                </div>
            </header>

            <div className={styles.actionBar}>
                <div className={styles.searchBox}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <button className={styles.filterBtn}><FaFilter /> Category</button>
                    <button className={styles.filterBtn} onClick={() => alert("Filter functionality would go here")}>Status</button>
                </div>
            </div>

            <section className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td className={styles.nameCell}>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{Number(product.price).toLocaleString()} so'm</td>
                                <td className={styles.stockCell}>{product.stock}</td>
                                <td>
                                    <span className={`${styles.statusLabel} ${styles[product.status] || styles.InStock}`}>
                                        {Number(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.editBtn} onClick={() => handleEditClick(product)} title="Edit">
                                        <FaEdit />
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => handleDeleteClick(product.id)} title="Delete">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000, backdropFilter: 'blur(8px)'
                }}>
                    <div style={{
                        background: '#ffffff', padding: '2rem', borderRadius: '24px', width: '500px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#000' }}>
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setShowModal(false)} style={{
                                background: '#f5f5f7', border: 'none', color: '#666',
                                width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Name</label>
                                <input
                                    type="text" placeholder="Product Name" required
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Price</label>
                                    <input
                                        type="number" placeholder="Price" required
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Stock</label>
                                    <input
                                        type="number" placeholder="Stock" required
                                        value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Category</label>
                                <input
                                    type="text" placeholder="Category (e.g. Phones)"
                                    value={formData.categoryName} onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
                                    style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Image URL</label>
                                <input
                                    type="text" placeholder="Image URL (optional)"
                                    value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', marginLeft: '4px' }}>Description</label>
                                <textarea
                                    placeholder="Description" rows={3}
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e1e1e1', background: '#f9f9f9', color: '#000', fontSize: '1rem', outline: 'none', resize: 'none' }}
                                />
                            </div>

                            <button type="submit" disabled={loading} style={{
                                marginTop: '1rem', padding: '1rem', borderRadius: '16px', background: '#000',
                                border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                            }}>
                                {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
