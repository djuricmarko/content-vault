import { HeaderFormButtons } from "@/components/header";

export default async function HeaderAction({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <HeaderFormButtons cancelHref={`/dashboard/category/${id}`} />;
}
