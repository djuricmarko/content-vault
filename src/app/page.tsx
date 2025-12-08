import styles from "./page.module.css";
import { Sidebar } from "@/components/Sidebar";
import { EntriesGrid } from "@/components/EntriesGrid";
import { Header } from "@/components/Header";

export default function Home() {
  const numberOfEntries = 10;

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <Header title="Entries" numberOfEntries={numberOfEntries} />
        <div className={styles.content}>
          <EntriesGrid numberOfEntries={numberOfEntries} />
        </div>
      </main>
    </div>
  );
}
