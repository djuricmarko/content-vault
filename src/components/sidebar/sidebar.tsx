import Link from "next/link";
import Image from "next/image";
import { eq } from "drizzle-orm";
import type { User } from "@supabase/auth-js";
import { Folder, LayoutDashboard, Settings, Vault } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { db } from "@/lib/drizzle/drizzle";
import { categories } from "@/lib/drizzle/schema";
import { SignOutButton } from "@/components/sign-out-button";
import { createClient } from "@/lib/supabase/server";
import { AddCategory } from "@/components/add-category";
import styles from './sidebar.module.css';

function SidebarHeading() {
  return (
    <div className={styles.heading}>
      <Link href="/dashboard">
        <Vault size={25} />
        <span>Content Vault</span>
      </Link>
    </div>
  );
}

function SidebarItems({ items }: { items: { id: string, name: string }[] }) {
  return (
    <div className={styles.items}>
      <Link href="/dashboard">
        <div className={styles.allItems}>
          <LayoutDashboard size={16} />
          <span>All entries</span>
        </div>
      </Link>
      <div className={styles.subHeading}>
        <p>Categories</p>
      </div>
      <ul>
        {items.map(item => (
          <Link href={`/dashboard/${item.id}`} key={item.id}>
            <li>
              <Folder size={16} />
              {item.name}
            </li>
          </Link>
        ))}
        <AddCategory />
      </ul>
    </div>
  );
}

function SidebarFooter({ userData, avatar }: { userData: User | null, avatar: string | null }) {
  return (
    <div className={styles.footer}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.triggerButton} aria-label="User options">
            <Image src={avatar || ''} width={32} height={32} alt="User avatar" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.dropdownContent} sideOffset={5} align="start">
            <div className={styles.dropdownHeader}>
              <Image src={avatar || ''} width={32} height={32} alt="User avatar" />
              <div className={styles.headerInfo}>
                <span className={styles.userName}>{userData?.user_metadata?.full_name}</span>
                <span className={styles.userEmail}>{userData?.email}</span>
              </div>
            </div>
            <DropdownMenu.Separator className={styles.separator} />
            <DropdownMenu.Item className={styles.dropdownItem}>
              <Settings size={18} />
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.dropdownItem}>
              <SignOutButton />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();

  const categoryList = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, String(data?.user?.id)));

  return (
    <aside className={styles.sidebar}>
      <SidebarHeading />
      <SidebarItems items={categoryList} />
      <SidebarFooter userData={data?.user} avatar={sessionData.session?.user.user_metadata.avatar_url} />
    </aside>
  );
}
