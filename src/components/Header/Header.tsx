import styles from "./header.module.css";

export function Header({ numberOfEntries }: { numberOfEntries: number }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Entries</h2>
        <span>●</span>
        <p>{numberOfEntries} items</p>
      </div>
      <button>Add new</button>
    </div>
  );
}
