'use server';

import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { categories } from "@/lib/drizzle/schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

interface FormState {
  success: boolean,
  error?: string;
  id?: string;
}

const categorySchema = z.object({
  name: z.string().min(1, { error: 'Category name is required' }).max(30),
  icon: z.string().min(1).max(30).default("folder"),
});

export async function createCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' };
  }

  const name = formData.get('name');
  const icon = formData.get('icon');
  const validatedFields = categorySchema.safeParse({ name, icon });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0].message
    };
  }

  try {
    const newCategory = await db.insert(categories).values({
      name: validatedFields.data.name,
      icon: validatedFields.data.icon,
      userId: user.id,
    }).returning({ id: categories.id });

    revalidatePath('/dashboard');
    return { success: true, id: newCategory[0].id };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to create category. Please try again.' };
  }
}
