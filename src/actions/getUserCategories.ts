'use server';

import { eq } from "drizzle-orm";
import { getAuthenticatedUser } from '@/lib/auth';
import { categories, type Category } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/drizzle";

export async function getUserCategories(): Promise<Category[]> {
  const { user, error } = await getAuthenticatedUser();

  if (!user || error) {
    return [];
  }

  return db.query.categories.findMany({
    where: eq(categories.userId, user.id),
  });
}
