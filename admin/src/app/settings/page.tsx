import { createAdminUser, getAdmins } from './actions';
import styles from './settings.module.css';
import { FaUserPlus, FaTrash, FaShieldAlt } from 'react-icons/fa';

import AddAdminForm from './AddAdminForm';

export default async function SettingsPage() {
    const admins = await getAdmins();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Settings & <span className={styles.highlight}>Users</span></h1>
                <p className={styles.subtitle}>Manage system access and configuration.</p>
            </header>

            <div className={styles.grid}>
                {/* Create Admin Form */}
                <section className={`${styles.card} ${styles.glass}`}>
                    <div className={styles.cardHeader}>
                        <h2><FaUserPlus /> Add New Admin</h2>
                    </div>
                    <AddAdminForm />
                </section>

                {/* Admins List */}
                <section className={`${styles.card} ${styles.glass}`}>
                    <div className={styles.cardHeader}>
                        <h2><FaShieldAlt /> Active Admins</h2>
                    </div>
                    <div className={styles.list}>
                        {admins.map(admin => (
                            <div key={admin.id} className={styles.listItem}>
                                <div className={styles.userInfo}>
                                    <div className={styles.avatar}>
                                        {admin.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className={styles.userName}>{admin.name}</p>
                                        <p className={styles.userEmail}>{admin.email}</p>
                                    </div>
                                </div>
                                <span className={styles.roleBadge}>ADMIN</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
