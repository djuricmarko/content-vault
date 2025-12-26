'use server';

import { and, eq } from "drizzle-orm";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";
import { entries, type Entry } from "@/lib/drizzle/schema";

export async function getEntry(id: string): Promise<Entry[]> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return [];
  }

  return db
    .select()
    .from(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, user.id)));
}
