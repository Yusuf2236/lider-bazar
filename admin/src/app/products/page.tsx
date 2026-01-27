'use client';

import { FaPlus, FaSearch, FaFilter, FaTrash, FaEdit, FaSync } from 'react-icons/fa';
import styles from './products.module.css';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
    const [productList, setProductList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

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

    const handleSync = async () => {
        if (!confirm('Start syncing products from YesPos?')) return;

        setLoading(true);
        try {
            // Assuming the main website API is running on localhost:3000
            // In production this URL needs to be configured
            const res = await fetch('http://localhost:3000/api/admin/sync-products', {
                method: 'POST',
            });
            const data = await res.json();
            if (res.ok) {
                alert(`Success: ${data.message}`);
                fetchProducts(); // Refresh list
            } else {
                alert(`Error: ${data.message || 'Sync failed'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to API');
        } finally {
            setLoading(false);
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
                    <button className={styles.addBtn} onClick={handleSync} disabled={loading}>
                        <FaSync className={loading ? styles.spin : ''} /> {loading ? 'Syncing...' : 'Sync YesPos'}
                    </button>
                    <button className={styles.addBtn}><FaPlus /> Add New Product</button>
                </div>
            </header>

            <div className={`${styles.actionBar} glass`}>
                <div className={styles.searchBox}>
                    <FaSearch />
                    <input type="text" placeholder="Search products..." />
                </div>
                <div className={styles.filters}>
                    <button className={styles.filterBtn}><FaFilter /> Category</button>
                    <button className={styles.filterBtn}>Status</button>
                </div>
            </div>

            <section className={`${styles.tableWrapper} glass`}>
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
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td className={styles.nameCell}>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price.toLocaleString()} so'm</td>
                                <td className={styles.stockCell}>{product.stock}</td>
                                <td>
                                    <span className={`${styles.statusLabel} ${styles[product.status]}`}>
                                        {product.status === 'InStock' ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.editBtn}><FaEdit /></button>
                                    <button className={styles.deleteBtn}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
