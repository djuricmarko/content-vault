'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Folder, LayoutDashboard } from "lucide-react";
import { Category } from "@/lib/drizzle/schema";
import { AddCategory } from "@/components/add-category";
import styles from "./sidebar.module.css";

export function SidebarItems({ items }: { items: Category[] }) {
  const pathname = usePathname();
  const id = pathname.split('/')[2];

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
        {items.map((item) => (
          <Link href={`/dashboard/${item.id}`} key={item.id}>
            <li className={id === item.id ? styles.activeItem : ''}>
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
