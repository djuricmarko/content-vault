'use server';

import { eq } from "drizzle-orm";
import { categories } from '@/lib/drizzle/schema';
import { db } from "@/lib/drizzle/drizzle";

export async function getCategoryName(id: string) {
  return db.select({ name: categories.name }).from(categories).where(eq(categories.id, id));
}
