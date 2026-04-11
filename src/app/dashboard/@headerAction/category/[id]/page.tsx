import { HeaderNewButton } from "@/components/header";

export default async function HeaderAction({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <HeaderNewButton href={`/dashboard/category/${id}/add`} label="New" />;
}
