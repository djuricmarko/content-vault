'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Folder, LayoutDashboard } from "lucide-react";
import { Category } from "@/lib/drizzle/schema";
import { AddCategory } from "@/components/add-category";
import { useSidebar } from "./sidebar-context";
import styles from "./sidebar.module.css";

export function SidebarItems({ items }: { items: Category[] }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const id = pathname.split('/')[3];

  return (
    <div className={styles.items}>
      <Link href="/dashboard">
        <div className={`${styles.allItems} ${pathname === '/dashboard' ? styles.activeItem : ''}`}>
          <LayoutDashboard size={16} />
          {!isCollapsed && <span>All entries</span>}
        </div>
      </Link>
      {!isCollapsed && (
        <div className={styles.subHeading}>
          <p>Categories</p>
        </div>
      )}
      <ul>
        {items.map((item) => (
          <Link href={`/dashboard/category/${item.id}`} key={item.id}>
            <li className={id === item.id ? styles.activeItem : ''}>
              <Folder size={16} />
              {!isCollapsed && <span>{item.name}</span>}
            </li>
          </Link>
        ))}
        {!isCollapsed && <AddCategory />}
      </ul>
    </div>
  );
}
