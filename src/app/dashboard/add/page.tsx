import { NewEntryForm } from "@/components/new-entry-form";
import { AddCategory } from "@/components/add-category";
import { getUserCategories } from "@/actions/getUserCategories";
import styles from "./page.module.css";

export default async function AddNewEntry() {
  const categories = await getUserCategories();

  if (categories.length === 0) {
    return (
      <>
        <div className={styles.emptyState}>
          <p className={styles.message}>
            You need to create a category first before adding entries.
          </p>
          <AddCategory triggerClassName={styles.primaryTrigger} />
        </div>
      </>
    );
  }

  return <NewEntryForm initialCategories={categories} />;
}
