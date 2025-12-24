import { Header } from "@/components/header";
import { NewEntryForm } from "@/components/new-entry-form";
import { getUserCategories } from "@/components/new-entry-form/actions";

export default async function AddNewEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getUserCategories();

  return (
    <>
      <Header title="New Entry" />
      <NewEntryForm initialCategories={categories} selectedCategory={slug} />
    </>
  );
}
