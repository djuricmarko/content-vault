import Link from 'next/link';
import { Vault } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <Vault size={64} strokeWidth={1.5} />
        </div>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
        </p>
        <Link href="/dashboard" className={styles.buttonLink}>
          <div className={styles.button}>Return to Dashboard</div>
        </Link>
      </div>
      <div className={styles.glow} />
    </div>
  );
}
