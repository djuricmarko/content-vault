import { EntriesGrid } from "./_components/entries-grid";
import { Header } from "./_components/header";
import styles from "./page.module.css";

export default function Home() {
  const numberOfEntries = 10;

  return (
    <>
      <Header title="Entries" numberOfEntries={numberOfEntries} />
      <div className={styles.content}>
        <EntriesGrid numberOfEntries={numberOfEntries} />
      </div>
    </>
  );
}
