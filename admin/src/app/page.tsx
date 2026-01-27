import React from 'react';
import StatCard from '@/components/StatCard';
import { FaDollarSign, FaShoppingCart, FaBox, FaChartBar, FaExclamationTriangle, FaSync } from 'react-icons/fa';
import styles from './page.module.css';
import { prisma } from '@/lib/db';

async function getStats() {
  // We are now fetching real data from the shared DB
  const totalOrders = await prisma.order.count();
  const productsCount = await prisma.product.count();

  // Revenue logic: sum 'total' from orders where status is COMPLETED
  const revenueAgg = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where: {
      status: 'COMPLETED'
    }
  });

  const revenue = revenueAgg._sum.total || 0;

  // Inventory alerts: products with stock < 5
  const lowStockProducts = await prisma.product.findMany({
    where: {
      stock: {
        lt: 5
      }
    },
    take: 3
  });

  const lowStockCount = await prisma.product.count({
    where: {
      stock: {
        lt: 5
      }
    }
  });

  // Recent analytics placeholder logic for now
  // We will just show total stats

  return {
    totalOrders,
    productsCount,
    revenue,
    lowStockProducts,
    lowStockCount
  };
}

// Revalidate every minute to keep stats fresh without reload
// export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Lider Bazar <span className={styles.highlight}>Admin</span></h1>
            <p className={styles.subtitle}>Overview & POS Integration Status</p>
          </div>
          {/* Server Components cannot have onClick handlers. We remove the refresh button or make it a Client Component wrapper. 
                For simplicity, we'll remove it or make it just a link. Or we can keep it if we accept it won't work in server component, 
                but actually simplest is to remove logic or 'use client';
 component for the header.
                We will remove the button logic for now to avoid error. */}
          <div className={styles.refreshBtn}>
            <FaSync /> <span style={{ fontSize: '0.9rem' }}>Auto-Sync</span>
          </div>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatCard title="Total Revenue" value={`${stats.revenue.toLocaleString()} so'm`} icon={<FaDollarSign />} trend="Calculated" trendType="up" />
        <StatCard title="Total Orders" value={stats.totalOrders.toString()} icon={<FaShoppingCart />} trend="Real-time" trendType="up" />
        <StatCard title="Products Count" value={stats.productsCount.toString()} icon={<FaBox />} trend="In Database" trendType="up" />
        <StatCard title="POS Connected" value="Active" icon={<FaSync />} trend="Webhook Ready" trendType="up" />
      </section>

      <div className={styles.mainGrid}>
        <section className={`${styles.card} ${styles.glass}`}>
          <div className={styles.cardHeader}>
            <h2>Sales Analytics</h2>
            {/* Select removed for Server Component simplicity */}
          </div>

          <div className={styles.analyticsList}>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>Total Revenue</span>
              <span className={styles.analyticsValue}>{stats.revenue.toLocaleString()} so'm</span>
            </div>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>Orders Count</span>
              <span className={styles.analyticsValue}>{stats.totalOrders}</span>
            </div>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>Products Listed</span>
              <span className={styles.analyticsValue}>{stats.productsCount}</span>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.glass}`}>
          <div className={styles.cardHeader}>
            <h2>Inventory Alerts</h2>
            <span className={styles.badge}><FaExclamationTriangle /> {stats.lowStockCount} Low Stock</span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.lowStockProducts.map((p: any) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.stock}</td>
                    <td><span className={styles.statusLow}>Low</span></td>
                  </tr>
                ))}
                {stats.lowStockProducts.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: 'var(--gray-400)' }}>All stock levels healthy</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className={styles.integrationInfo}>
        <h3>YES POS Integration</h3>
        <p>Endpoint: <code>/api/integration/yes-pos</code></p>
        <p>Status: <span className={styles.statusOk}>Ready via Webhook</span></p>
      </div>
    </div>
  );
}
