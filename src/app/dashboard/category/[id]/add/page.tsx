import type { Metadata } from 'next';
import { Header } from "@/components/header";
import { NewEntryForm } from "@/components/new-entry-form";
import { getUserCategories } from "@/actions/getUserCategories";

export const metadata: Metadata = {
  title: 'New Entry',
};

export default async function AddNewEntry({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getUserCategories();

  return (
    <>
      <Header title="New Entry" />
      <NewEntryForm initialCategories={categories} selectedCategory={id} />
    </>
  );
}
