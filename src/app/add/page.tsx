import styles from './add.module.css';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { EntryEditor } from "@/components/EntryEditor";

export default function AddNewEntry() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <Header title="New Entry" />
        <div className={styles.content}>
          <p>Title</p>
          <EntryEditor />
        </div>
      </main>
    </div>
  );
}
