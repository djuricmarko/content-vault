import { Header } from "@/components/header";
import { RenderHtml } from "@/components/entries-grid/render-html";
import { getEntry } from "./getEntry";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);

  return (
    <>
      <Header title={entry[0]?.title || ''} />
      <RenderHtml html={entry[0]?.content || ''} />
    </>
  );
}
