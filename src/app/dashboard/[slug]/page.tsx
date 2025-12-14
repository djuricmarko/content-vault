import { Header } from "@/components/header";
import { EntriesGrid } from "@/components/entries-grid";
import { getCategoryName, getEntry } from "./getEntry";
import styles from "../page.module.css";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getEntry(slug);
  const category = await getCategoryName(slug);

  return (
    <>
      <Header title={category[0].name || ''} />
      <div className={styles.content}>
        <EntriesGrid items={items} />
      </div>
    </>
  );
}
