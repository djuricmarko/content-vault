'use server';

import { and, eq } from "drizzle-orm";
import { categories, type Category } from '@/lib/drizzle/schema';
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

export async function getCategoryName(id: string): Promise<Pick<Category, 'name'>[]> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return [];
  }

  return db
    .select({ name: categories.name })
    .from(categories)
    .where(and(eq(categories.id, id), eq(categories.userId, user.id)));
}
