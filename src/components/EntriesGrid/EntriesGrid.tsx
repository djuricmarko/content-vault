import styles from './entries-grid.module.css';

export function EntriesGrid({ numberOfEntries }: { numberOfEntries: number }) {
  return (
    <div className={styles.container}>
      {Array.from({ length: numberOfEntries }).map((_, index) => (
        <div className={styles.entry} key={index}>
          <p className={styles.title}>Title</p>
          <p className={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            enetreset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p className={styles.category}>Category</p>
          <span className={styles.timestamp}>about 2 hours ago</span>
        </div>
      ))}
    </div>
  );
}
