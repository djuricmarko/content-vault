'use server';

import { eq } from "drizzle-orm";
import { entries } from '@/lib/drizzle/schema';
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/drizzle";

export async function getEntriesByCategory(categoryId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const entriesList = db.select().from(entries).where(eq(entries.categoryId, categoryId));

  if (!data.user?.id || error) {
    return [];
  }

  return entriesList;
}
