'use server';

import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/drizzle";
import { entries } from "@/lib/drizzle/schema";

export async function getEntry(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const entry= db.select().from(entries).where(eq(entries.id, id));

  if (!data.user?.id || error) {
    return [];
  }

  return entry;
}
