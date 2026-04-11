import { EntriesGrid } from "@/components/entries-grid";
import { getEntriesByCategory } from "@/actions/getEntriesByCategory";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = await getEntriesByCategory(id);

  return <EntriesGrid items={items} />;
}
