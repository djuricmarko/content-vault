'use server';

import { and, eq } from "drizzle-orm";
import { categories } from '@/lib/drizzle/schema';
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

export async function getCategoryName(id: string): Promise<{ name: string } | undefined> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return undefined;
  }

  return db.query.categories.findFirst({
    columns: { name: true },
    where: and(eq(categories.id, id), eq(categories.userId, user.id)),
  });
}
