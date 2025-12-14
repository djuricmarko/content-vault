import { Suspense } from "react";
import { Header } from "@/components/header";
import { NewEntryForm } from "@/components/new-entry-form";
import { getUserCategories } from "@/components/new-entry-form/actions";
import styles from './add.module.css';

async function CategoriesLoader() {
  const categories = await getUserCategories();
  return <NewEntryForm initialCategories={categories} />;
}

function CategoriesLoading() {
  return (
    <div className={styles.content}>
      <p>Loading...</p>
    </div>
  );
}

export default function AddNewEntry() {
  return (
    <>
      <Header title="New Entry" />
      <Suspense fallback={<CategoriesLoading />}>
        <CategoriesLoader />
      </Suspense>
    </>
  );
}
