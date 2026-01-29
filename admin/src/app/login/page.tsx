'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaStore, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './login.module.css';

export default function LoginPage() {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* 1. Dynamic Gradient Background */}
            <div className={styles.backgroundAnimation} />

            {/* 2. Floating Orbs / Bokeh Effect */}
            <div className={styles.orbContainer}>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
            </div>

            {/* 3. Login Card */}
            <div className={styles.card}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #ff6b00, #ff8800)',
                        borderRadius: '24px',
                        marginBottom: '1.5rem',
                        boxShadow: '0 10px 25px rgba(255, 107, 0, 0.4)'
                    }}>
                        <FaStore style={{ fontSize: '40px', color: 'white' }} />
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        marginBottom: '8px',
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Lider Bazar
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Admin Boshqaruv Tizimi</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {error && (
                        <div style={{
                            padding: '12px',
                            background: 'rgba(255, 59, 48, 0.9)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            textAlign: 'center',
                            fontWeight: '500'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className={styles.inputWrapper}>
                        <FaEnvelope className={styles.inputIcon} />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={data.email}
                            onChange={e => setData({ ...data, email: e.target.value })}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.inputWrapper}>
                        <FaLock className={styles.inputIcon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Parol"
                            value={data.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            className={styles.inputField}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '18px',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#999',
                                display: 'flex',
                                alignItems: 'center',
                                zIndex: 10
                            }}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitBtn}
                    >
                        {loading ? 'Kirish...' : 'KIRISH'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                        Lider Bazar &copy; 2026. Xavfsiz Tizim.
                    </div>
                </form>
            </div>
        </div>
    );
}
