'use server';

import { eq } from "drizzle-orm";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";
import { entries, type Entry } from "@/lib/drizzle/schema";

export async function getAllEntries(): Promise<Entry[]> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return [];
  }

  return db
    .select()
    .from(entries)
    .where(eq(entries.userId, user.id));
}
