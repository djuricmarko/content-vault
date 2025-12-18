import styles from './new-entry-skeleton.module.css';

export function NewEntrySkeleton() {
  return (
    <div className={styles.container}>
      <div className={`${styles.skeleton} ${styles.pageTitle}`} />
      <div className={styles.controlsRow}>
        <div className={`${styles.skeleton} ${styles.input}`} />
        <div className={`${styles.skeleton} ${styles.dropdown}`} />
        <div className={`${styles.skeleton} ${styles.saveBtn}`} />
      </div>
      <div className={styles.editorContainer}>
        <div className={`${styles.skeleton} ${styles.toolbar}`} />
        <div className={`${styles.skeleton} ${styles.textArea}`} />
      </div>
    </div>
  );
}
