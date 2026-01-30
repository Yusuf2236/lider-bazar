import { Metadata } from 'next';
import NewsContent from './NewsContent';

export const metadata: Metadata = {
    title: 'Yangiliklar | Lider Bazar',
    description: 'Lider Bazar do\'konidagi eng so\'nggi yangiliklar, aksiyalar va chegirmalar bilan tanishing.',
};

export default function Page() {
    return <NewsContent />;
}
