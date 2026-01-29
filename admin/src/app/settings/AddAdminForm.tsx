'use client';

import { useRef } from 'react';
import { createAdminUser } from './actions';
import styles from './settings.module.css';

export default function AddAdminForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function clientAction(formData: FormData) {
        try {
            const result = await createAdminUser(formData);
            if (result.success) {
                alert("Admin created successfully!");
                formRef.current?.reset();
            }
        } catch (error: any) {
            alert(error.message || "Failed to create admin");
        }
    }

    return (
        <form ref={formRef} action={clientAction} className={styles.form}>
            <div className={styles.inputGroup}>
                <label>Name</label>
                <input name="name" type="text" placeholder="John Doe" required />
            </div>
            <div className={styles.inputGroup}>
                <label>Email</label>
                <input name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className={styles.inputGroup}>
                <label>Password</label>
                <input name="password" type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className={styles.submitBtn}>Create Admin</button>
        </form>
    );
}
