import styles from './entries-grid.module.css';

export function EntriesGrid({ numberOfEntries }: { numberOfEntries: number }) {
  return (
    <div className={styles.container}>
      {Array.from({ length: numberOfEntries }).map((_, index) => (
        <div className={styles.entry} key={index}>
          <p>Some text inside the entry</p>
          <p>Category</p>
          <span>Timestamp</span>
        </div>
      ))}
    </div>
  );
}
