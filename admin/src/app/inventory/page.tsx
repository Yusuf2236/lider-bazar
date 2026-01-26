import React from 'react';
import { FaBoxes, FaExclamationTriangle } from 'react-icons/fa';
import styles from './inventory.module.css';
import { prisma } from '@/lib/db';

async function getInventory() {
    const products = await prisma.product.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            category: true
        }
    });

    // Recent stock updates (mock logic: last 3 updated)
    const recent = products.slice(0, 3);

    // Low stock
    const lowStock = products.filter(p => p.stock < 5);

    return { products, recent, lowStock };
}

export const revalidate = 60;

export default async function InventoryPage() {
    const { products, recent, lowStock } = await getInventory();

    return (
        <div className={styles.inventory}>
            <header className={styles.header}>
                <h1 className={styles.title}>Inventory <span className={styles.highlight}>Management</span></h1>
                <p className={styles.subtitle}>Track and manage your product stock levels.</p>
            </header>

            <div className={styles.grid}>
                <div className={`${styles.card} glass`}>
                    <div className={styles.cardHeader}>
                        <FaBoxes />
                        <h3>Recent Updates</h3>
                    </div>
                    <ul className={styles.activityList}>
                        {recent.map(p => (
                            <li key={p.id} style={{ fontSize: '0.9rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                Stock: {p.name} ({p.stock})
                            </li>
                        ))}
                        {recent.length === 0 && <li>No recent updates</li>}
                    </ul>
                </div>

                <div className={`${styles.card} glass`}>
                    <div className={styles.cardHeader}>
                        <FaExclamationTriangle style={{ color: 'var(--primary-orange)' }} />
                        <h3>Critical Low Stock</h3>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStock.slice(0, 3).map(p => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}>{p.stock}</td>
                                </tr>
                            ))}
                            {lowStock.length === 0 && (
                                <tr><td colSpan={2}>Stocks are healthy</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <section className={`${styles.mainSection} glass`}>
                <div className={styles.sectionHeader}>
                    <h2>Full Stock Inventory ({products.length})</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>In Stock</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category?.name || 'N/A'}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price.toLocaleString()}</td>
                                    <td>
                                        {product.stock > 0 ? (
                                            product.stock < 5 ?
                                                <span className={styles.statusLow}>Low</span> :
                                                <span className={styles.statusOk}>Available</span>
                                        ) : (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
