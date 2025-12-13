import { Header } from "@/components/Header";
import { NewEntryForm } from "@/components/NewEntryForm";
import { getUserCategories } from "@/components/NewEntryForm/actions";
import styles from './add.module.css';
import { Suspense } from "react";

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
