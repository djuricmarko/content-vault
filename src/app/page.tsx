import styles from "./page.module.css";
import { Sidebar } from "@/components/Sidebar";
import { EntriesGrid } from "@/components/EntriesGrid";

export default function Home() {
  const numberOfEntries = 10;

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.heading}>
          <h2>Main content</h2>
          <span>●</span>
          <p>{numberOfEntries} items</p>
        </div>
        <div className={styles.content}>
          <EntriesGrid numberOfEntries={numberOfEntries} />
        </div>
      </main>
    </div>
  );
}
