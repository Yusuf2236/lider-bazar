'use client';

import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaTrash, FaEdit } from 'react-icons/fa';
import styles from './products.module.css';

const initialProducts = [
    { id: 1, name: 'Apple iPhone 15 Pro', category: 'Phones', price: 14500000, stock: 5, status: 'In Stock' },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Phones', price: 12000000, stock: 12, status: 'In Stock' },
    { id: 3, name: 'Chocolate Cake', category: 'Bakery', price: 85000, stock: 2, status: 'Low Stock' },
];

export default function ProductsPage() {
    const [productList, setProductList] = useState(initialProducts);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Product <span className={styles.highlight}>Management</span></h1>
                    <p className={styles.subtitle}>Add, edit, and keep track of your product inventory.</p>
                </div>
                <button className={styles.addBtn}><FaPlus /> Add New Product</button>
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
                                    <span className={`${styles.statusLabel} ${styles[product.status.replace(' ', '')]}`}>
                                        {product.status}
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
