import { EntriesGrid } from "@/components/entries-grid";
import { getAllEntries } from "@/actions/getAllEntries";

export default async function Home() {
  const allEntries = await getAllEntries();

  return <EntriesGrid items={allEntries} />;
}
