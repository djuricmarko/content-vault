import { notFound } from "next/navigation";
import { getEntry } from "@/actions/getEntry";
import { EntryEdit } from "@/components/entry-edit";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    notFound();
  }

  return <EntryEdit entry={entry} />;
}
