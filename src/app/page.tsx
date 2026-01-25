import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import CategorySection from '@/components/CategorySection';
import FloatingActions from '@/components/FloatingActions';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSection />
      <CategorySection />

      {/* Call Center Widget CTA was replaced by FloatingActions visually */}

      <NewsSection />
      <FloatingActions />
    </div>
  );
}
