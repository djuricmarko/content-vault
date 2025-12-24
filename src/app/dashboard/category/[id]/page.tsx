import { Header } from "@/components/header";
import { EntriesGrid } from "@/components/entries-grid";
import { getCategoryName, getEntries } from "./getEntries";
import styles from "../../page.module.css";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = await getEntries(id);
  const category = await getCategoryName(id);

  return (
    <>
      <Header title={category[0]?.name || ''} />
      <div className={styles.content}>
        <EntriesGrid items={items} id={id} />
      </div>
    </>
  );
}
