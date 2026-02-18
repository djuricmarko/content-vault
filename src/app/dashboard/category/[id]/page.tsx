import { Header } from "@/components/header";
import { EntriesGrid } from "@/components/entries-grid";
import { getEntriesByCategory } from "@/actions/getEntriesByCategory";
import { getCategoryName } from "@/actions/getCategoryName";
import styles from "../../page.module.css";

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
