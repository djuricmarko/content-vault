'use server';

import { eq } from "drizzle-orm";
import { categories, entries } from '@/lib/drizzle/schema';
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/drizzle";

export async function getEntries(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const entriesList = db.select().from(entries).where(eq(entries.categoryId, id));

  if (!data.user?.id || error) {
    return [];
  }

  return entriesList;
}

export async function getCategoryName(id: string) {
  return db.select({ name: categories.name }).from(categories).where(eq(categories.id, id));
}
