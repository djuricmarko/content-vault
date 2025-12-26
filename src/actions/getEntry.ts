'use server';

import { and, eq } from "drizzle-orm";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";
import { entries, type Entry } from "@/lib/drizzle/schema";

export async function getEntry(id: string): Promise<Entry | undefined> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return undefined;
  }

  return db.query.entries.findFirst({
    where: and(eq(entries.id, id), eq(entries.userId, user.id)),
  });
}
