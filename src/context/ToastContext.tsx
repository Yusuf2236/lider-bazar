'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FaCheckCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'info' | 'error';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map((toast) => (
                    <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                        <div className={styles.icon}>
                            {toast.type === 'success' && <FaCheckCircle />}
                            {toast.type === 'info' && <FaInfoCircle />}
                            {toast.type === 'error' && <FaTimes />}
                        </div>
                        <span className={styles.message}>{toast.message}</span>
                        <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
