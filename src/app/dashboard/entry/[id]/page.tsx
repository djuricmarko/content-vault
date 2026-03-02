import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getEntry } from "@/actions/getEntry";
import { EntryView } from "@/components/entry-view";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entry = await getEntry(id);

  return {
    title: entry?.title ?? 'Entry',
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    notFound();
  }

  return <EntryView entry={entry} />;
}
