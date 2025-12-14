'use server';

import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/drizzle";
import { entries } from "@/lib/drizzle/schema";

export async function getAllEntries() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  return db
    .select()
    .from(entries)
    .where(eq(entries.userId, String(user.id)));
}
