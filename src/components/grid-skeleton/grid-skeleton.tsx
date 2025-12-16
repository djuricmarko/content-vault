import styles from "./grid-skeleton.module.css";

export function GridSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.title} />
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.item} />
        ))}
      </div>
    </div>
  );
}
