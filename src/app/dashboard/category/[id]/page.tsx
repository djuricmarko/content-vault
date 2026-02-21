import type { Metadata } from 'next';
import { Header } from "@/components/header";
import { EntriesGrid } from "@/components/entries-grid";
import { getEntriesByCategory } from "@/actions/getEntriesByCategory";
import { getCategoryName } from "@/actions/getCategoryName";
import styles from "../../page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryName(id);

  return {
    title: category?.name ?? 'Category',
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [items, category] = await Promise.all([
    getEntriesByCategory(id),
    getCategoryName(id),
  ]);

  return (
    <>
      <Header title={category?.name ?? ''} categoryId={id} />
      <div className={styles.content}>
        <EntriesGrid items={items} id={id} />
      </div>
    </>
  );
}
