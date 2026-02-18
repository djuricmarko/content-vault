'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { categories } from "@/lib/drizzle/schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

interface FormState {
  success: boolean,
  error?: string;
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

  let newCategoryId: string;

  try {
    const newCategory = await db.insert(categories).values({
      name: validatedFields.data.name,
      icon: validatedFields.data.icon,
      userId: user.id,
    }).returning({ id: categories.id });

    newCategoryId = newCategory[0].id;
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to create category. Please try again.' };
  }

  redirect(`/dashboard/category/${newCategoryId}`);
}
