import { ChevronsLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserCategories } from "@/components/new-entry-form/actions";
import { SidebarHeading } from "./sidebar-heading";
import { SidebarItems } from "./sidebar-items";
import { SidebarFooter } from "./sidebar-footer";
import styles from "./sidebar.module.css";

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();

  const categoryList = await getUserCategories();

  return (
    <aside className={styles.sidebar}>
      <button className={styles.expandIcon}>
        <ChevronsLeft size={18} />
      </button>
      <SidebarHeading />
      <SidebarItems items={categoryList} />
      <SidebarFooter
        userData={data?.user}
        avatar={sessionData.session?.user.user_metadata.avatar_url}
      />
    </aside>
  );
}
