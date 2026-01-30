'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Captured by anti-bug system:', error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
            gap: '1.5rem',
            color: 'var(--foreground)'
        }}>
            <FaExclamationTriangle size={50} color="#FF3B30" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Something went wrong!</h2>
            <p style={{ color: '#888', maxWidth: '400px' }}>
                Our anti-bug system caught an unexpected issue. Don't worry, you can try again.
            </p>
            <button
                onClick={
                    // Try again or go back to the home page if you're still having trouble.
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                <FaRedo /> Try Again
            </button>
            {process.env.NODE_ENV === 'development' && (
                <pre style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    overflow: 'auto',
                    maxWidth: '100%'
                }}>
                    {error.message}
                </pre>
            )}
        </div>
    );
}
