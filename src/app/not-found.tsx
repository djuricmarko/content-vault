"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => router.push("/dashboard")}>
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
