import { NewEntryForm } from "@/components/new-entry-form";
import { getUserCategories } from "@/actions/getUserCategories";

export default async function AddNewEntry({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getUserCategories();

  return <NewEntryForm initialCategories={categories} selectedCategory={id} />;
}
