'use server';

import { z } from "zod";
import { eq } from "drizzle-orm";
import { createClient } from '@/lib/supabase/server';
import { categories, entries } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/drizzle";
import { revalidatePath } from "next/cache";

interface FormState {
  error: string | undefined;
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
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'You must be logged in to create a entry.' };
  }

  const title = formData.get('title');
  const category = formData.get('category');
  const content = formData.get('content');

  const validatedFields = entrySchema.safeParse({ title, category, content });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues;

    const errorMap = issues.reduce((acc, issue) => {
      const fieldName = String(issue.path[0]);
      acc[fieldName] = issue.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      error: Object.values(errorMap).join(', ')
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
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to create entry. Please try again.' };
  }

  return {
    error: undefined
  };
}

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
