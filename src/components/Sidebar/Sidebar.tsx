import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/utils/supabase/server";
import { AddCategory } from "@/components/AddCategory";
import styles from './sidebar.module.css';

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const categoryList = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, String(data?.user?.id)));

  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h1>Content Vault</h1>
      </div>
      <div className={styles.items}>
        <ul>
          <li>All items</li>
          {categoryList.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
          <AddCategory />
        </ul>
      </div>
      <div className={styles.footer}>
        <p>{data?.user?.email}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
