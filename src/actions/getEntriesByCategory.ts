'use server';

import { and, eq } from "drizzle-orm";
import { entries, type Entry } from '@/lib/drizzle/schema';
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

export async function getEntriesByCategory(categoryId: string): Promise<Entry[]> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return [];
  }

  return db.query.entries.findMany({
    where: and(eq(entries.categoryId, categoryId), eq(entries.userId, user.id)),
  });
}
