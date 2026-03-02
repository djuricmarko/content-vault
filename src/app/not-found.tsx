import type { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/button";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        <Link href="/dashboard">
          <Button>
            Back to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
