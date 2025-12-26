'use server';

import { eq } from "drizzle-orm";
import { createClient } from '@/lib/supabase/server';
import { categories } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/drizzle";

export async function getUserCategories() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  return db
    .select()
    .from(categories)
    .where(eq(categories.userId, String(user.id)));
}
