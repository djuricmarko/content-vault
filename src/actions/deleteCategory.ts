'use server';

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { categories, entries } from "@/lib/drizzle/schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

interface DeleteResult {
  success: boolean;
  error?: string;
}

export async function deleteCategory(categoryId: string): Promise<DeleteResult> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await db
      .delete(entries)
      .where(and(eq(entries.categoryId, categoryId), eq(entries.userId, user.id)));

    const deleted = await db
      .delete(categories)
      .where(and(eq(categories.id, categoryId), eq(categories.userId, user.id)))
      .returning({ id: categories.id });

    if (deleted.length === 0) {
      return { success: false, error: 'Category not found or not authorized to delete' };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to delete category. Please try again.' };
  }
}
