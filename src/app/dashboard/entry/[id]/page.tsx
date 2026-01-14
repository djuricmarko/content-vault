import { notFound } from "next/navigation";
import { getEntry } from "@/actions/getEntry";
import { EntryView } from "@/components/entry-view";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  if (!entry) {
    notFound();
  }

  return <EntryView entry={entry} />;
}
