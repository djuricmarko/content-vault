import { Header } from "@/components/header";
import { NewEntryForm } from "@/components/new-entry-form";
import { getUserCategories } from "@/components/new-entry-form/actions";

export default async function AddNewEntry() {
  const categories = await getUserCategories();

  return (
    <>
      <Header title="New Entry" />
      <NewEntryForm initialCategories={categories} />
    </>
  );
}
