import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/utils/supabase/server";
import styles from './sidebar.module.css';

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h1>Content Vault</h1>
      </div>
      <div className={styles.items}>
        <ul>
          <li>All items</li>
          <li>Category #1</li>
          <li>Category #2</li>
          <li>Category #3</li>
          <input type="text" />
          <button>Add category</button>
        </ul>
      </div>
      <div className={styles.footer}>
        <p>{data?.claims.email}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
