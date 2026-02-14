'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { profiles } from "@/lib/drizzle/schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/drizzle/drizzle";
import { eq } from "drizzle-orm";

interface FormState {
  success: boolean;
  error?: string;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50),
  surname: z.string().min(1, { message: "Surname is required" }).max(50),
});

export async function updateProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;

  const validatedFields = profileSchema.safeParse({ name, surname });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0].message,
    };
  }

  try {
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    if (existingProfile.length > 0) {
      await db
        .update(profiles)
        .set({
          name: validatedFields.data.name,
          surname: validatedFields.data.surname,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, user.id));
    } else {
      await db.insert(profiles).values({
        userId: user.id,
        name: validatedFields.data.name,
        surname: validatedFields.data.surname,
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save profile. Please try again." };
  }
}

export async function getProfile(userId: string) {
  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  return profile[0] || null;
}
