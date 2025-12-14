import { EntriesGrid } from "@/components/entries-grid";
import { Header } from "@/components/header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header title="All entries" />
      <div className={styles.content}>
        <EntriesGrid numberOfEntries={10} />
      </div>
    </>
  );
}
