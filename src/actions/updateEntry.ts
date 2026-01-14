'use server';

import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { getAuthenticatedUser } from '@/lib/auth';
import { entries } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/drizzle";
import { revalidatePath } from "next/cache";

interface FormState {
  success: boolean,
  error?: string;
}

const updateEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { error: 'Title is required' }).max(30),
  content: z.string().min(1, { error: 'Content is required' })
});

export async function updateEntry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' };
  }

  const id = formData.get('id');
  const title = formData.get('title');
  const content = formData.get('content');

  const validatedFields = updateEntrySchema.safeParse({ id, title, content });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues.map(issue => issue.message).join(', ')
    };
  }

  try {
    const updated = await db
      .update(entries)
      .set({
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(entries.id, validatedFields.data.id),
          eq(entries.userId, user.id)
        )
      )
      .returning({ id: entries.id });

    if (updated.length === 0) {
      return { success: false, error: 'Entry not found or not authorized to edit' };
    }

    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/entry/${validatedFields.data.id}`);
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to update entry. Please try again.' };
  }
}
