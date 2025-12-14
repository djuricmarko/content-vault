import { Header } from "@/components/header";
import { EntriesGrid } from "@/components/entries-grid";
import { getEntry } from "@/app/dashboard/[slug]/getEntry";
import styles from "@/app/dashboard/page.module.css";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getEntry(slug);

  return (
    <>
      <Header title="All entries" />
      <div className={styles.content}>
        <EntriesGrid items={items} />
      </div>
    </>
  );
}
