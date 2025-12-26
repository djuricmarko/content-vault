'use server';

import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { categories } from "@/lib/drizzle/schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";

interface FormState {
  success: boolean,
  error?: string;
}

const categorySchema = z.object({
  name: z.string().min(1, { error: 'Category name is required' }).max(30)
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
  const validatedFields = categorySchema.safeParse({ name });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0].message
    };
  }

  try {
    await db.insert(categories).values({
      name: validatedFields.data.name,
      userId: user.id,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to create category. Please try again.' };
  }
}
