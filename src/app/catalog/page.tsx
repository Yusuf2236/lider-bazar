'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function CatalogPage() {
    const { t } = useLanguage();
    return (
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
            <h1 className="glass" style={{ display: 'inline-block', padding: '2rem 4rem', borderRadius: '24px' }}>
                {t.header.catalog} - Tez kunda!
            </h1>
            <p style={{ marginTop: '2rem', color: 'var(--gray-400)' }}>Sahifa hozirda ishlab chiqilmoqda.</p>
        </div>
    );
}
