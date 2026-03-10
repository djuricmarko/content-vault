'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Ellipsis, LayoutDashboard, Trash } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Category } from "@/lib/drizzle/schema";
import { AddCategory } from "@/components/add-category";
import { useSidebar } from "./sidebar-context";
import styles from "./sidebar.module.css";
import { Menu } from "@base-ui/react/menu";
import { DeleteCategoryDialog } from "@/components/delete-category-dialog";
import { useState } from "react";

export function SidebarItems({ items }: { items: Category[] }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className={styles.items}>
      <Link href="/dashboard">
        <div className={`${styles.allItems} ${pathname === '/dashboard' ? styles.activeItem : ''}`}>
          <LayoutDashboard size={18} />
          {!isCollapsed && <span>All entries</span>}
        </div>
      </Link>
      {!isCollapsed && (
        <div className={styles.subHeading}>
          <p>Categories</p>
          <AddCategory triggerClassName={styles.addCategory} />
        </div>
      )}
      <ul>
        {items.map((item) => (
          <Link href={`/dashboard/category/${item.id}`} key={item.id}>
            <li className={id === item.id ? styles.activeItem : ''}>
              <div className={styles.categoryLabel}>
                <DynamicIcon
                  name={(
                    item.icon ?? "folder"
                  ) as IconName}
                  size={18}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && (
                <Menu.Root>
                  <Menu.Trigger className={styles.options} aria-label="Category options">
                    <Ellipsis />
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner sideOffset={10} alignOffset={-25}>
                      <Menu.Popup className={styles.dropdownContent}>
                        <Menu.Item
                          className={styles.dropdownItem}
                          onClick={() => setDeleteDialogOpen(true)}
                        >
                          <Trash size={16} color="red" />
                          Delete
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              )}
            </li>
          </Link>
        ))}
        {!isCollapsed && (
          <DeleteCategoryDialog
            categoryId={id}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        )}
        {isCollapsed && <AddCategory />}
      </ul>
    </div>
  );
}
