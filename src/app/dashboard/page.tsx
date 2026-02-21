import type { Metadata } from 'next';
import { EntriesGrid } from "@/components/entries-grid";
import { Header } from "@/components/header";
import { getAllEntries } from "@/actions/getAllEntries";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Home() {
  const allEntries = await getAllEntries();

  return (
    <>
      <Header title="All entries" />
      <EntriesGrid items={allEntries} />
    </>
  );
}
