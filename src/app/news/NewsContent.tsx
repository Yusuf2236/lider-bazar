'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsPage() {
    const { t } = useLanguage();
    return (
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
            <h1 className="glass" style={{ display: 'inline-block', padding: '2rem 4rem', borderRadius: '24px' }}>
                {t.news.title}
            </h1>
            <p style={{ marginTop: '2rem', color: 'var(--gray-400)' }}>Eng so'nggi yangiliklar shu yerda paydo bo'ladi.</p>
        </div>
    );
}
