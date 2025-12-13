import { Header } from "@/components/Header";
import { NewEntryForm } from "@/components/NewEntryForm";
import { getUserCategories } from "@/components/NewEntryForm/actions";
import styles from './add.module.css';

export default async function AddNewEntry() {
  const categories = await getUserCategories();

  return (
    <>
      <Header title="New Entry" />
      <div className={styles.content}>
        <NewEntryForm initialCategories={categories} />
      </div>
    </>
  );
}
