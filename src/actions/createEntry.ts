'use server';

import { z } from "zod";
import { getAuthenticatedUser } from '@/lib/auth';
import { entries } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/drizzle";
import { revalidatePath } from "next/cache";

interface FormState {
  success: boolean,
  error?: string;
}

const entrySchema = z.object({
  title: z.string().min(1, { error: 'Title is required' }).max(30),
  category: z.string().min(1, { error: 'Category is required' }),
  content: z.string().min(1, { error: 'Content is required' })
});

export async function createEntry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' };
  }

  const title = formData.get('title');
  const category = formData.get('category');
  const content = formData.get('content');

  const validatedFields = entrySchema.safeParse({ title, category, content });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues.map(issue => issue.message).join(', ')
    };
  }

  try {
    await db.insert(entries).values({
      userId: user.id,
      categoryId: validatedFields.data.category,
      title: validatedFields.data.title,
      content: validatedFields.data.content
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to create entry. Please try again.' };
  }
}
