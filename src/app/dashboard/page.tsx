import { EntriesGrid } from "@/components/entries-grid";
import { Header } from "@/components/header";
import styles from "./page.module.css";
import { getAllEntries } from "@/app/dashboard/getAllEntries";
import { Suspense } from "react";

export default async function Home() {
  const allEntries = await getAllEntries();

  return (
    <>
      <Header title="All entries" />
      <div className={styles.content}>
        <Suspense fallback={<p>Loading...</p>}>
          <EntriesGrid items={allEntries} />
        </Suspense>
      </div>
    </>
  );
}
