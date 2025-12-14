import { EntriesGrid } from "@/components/entries-grid";
import { Header } from "@/components/header";
import { getAllEntries } from "@/app/dashboard/getAllEntries";
import styles from "./page.module.css";

export default async function Home() {
  const allEntries = await getAllEntries();

  return (
    <>
      <Header title="All entries" />
      <div className={styles.content}>
        <EntriesGrid items={allEntries} />
      </div>
    </>
  );
}
