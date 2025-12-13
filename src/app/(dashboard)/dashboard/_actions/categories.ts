'use server';

import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { categories } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db/drizzle";

interface FormState {
  error: string | undefined;
}

const categorySchema = z.object({
  name: z.string().min(1, { error: 'Category name is required' }).max(30)
});

export async function createCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'You must be logged in to create a category.' };
  }

  const name = formData.get('name');
  const validatedFields = categorySchema.safeParse({ name });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues;
    const nameError = issues.find((issue) => issue.path[0] === 'name');

    return {
      error: nameError?.message
    };
  }

  try {
    await db.insert(categories).values({
      name: validatedFields.data.name,
      userId: user.id,
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to create category. Please try again.' };
  }

  return {
    error: undefined
  }
}
