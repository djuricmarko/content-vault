import styles from './add.module.css';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function AddNewEntry() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <Header title="New Entry" />
        <div className={styles.content}>
        </div>
      </main>
    </div>
  );
}
