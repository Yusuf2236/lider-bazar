import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            gap: '1.5rem',
            padding: '2rem'
        }}>
            <FaSearch size={60} color="#FF9F0A" style={{ opacity: 0.5 }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Page Not Found</h2>
            <p style={{ color: '#888' }}>Could not find requested resource</p>
            <Link
                href="/"
                style={{
                    padding: '0.8rem 1.5rem',
                    background: 'var(--primary)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                }}
            >
                Return Home
            </Link>
        </div>
    );
}
