import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { NewEntryForm } from "@/components/NewEntryForm";
import styles from './add.module.css';

export default async function AddNewEntry() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <Header title="New Entry" />
        <div className={styles.content}>
          <NewEntryForm />
        </div>
      </main>
    </div>
  );
}
