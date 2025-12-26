import { Header } from "@/components/header";
import { getEntry } from "@/actions/getEntry";
import EntryEditor from "@/components/entry-editor/entry-editor";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  return (
    <>
      <Header title={entry[0]?.title || ''} />
      <EntryEditor content={entry[0]?.content ?? ''} />
    </>
  );
}
