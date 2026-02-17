'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/auth-js";
import { MenuIcon, LayoutDashboard, Settings, Ellipsis, Trash } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Menu } from '@base-ui/react/menu';
import { Category } from "@/lib/drizzle/schema";
import { Sheet } from "@/components/sheet";
import { AddCategory } from "@/components/add-category";
import { SignOutButton } from "@/components/sign-out-button";
import { SettingsDialog } from "@/components/settings-dialog";
import { DeleteCategoryDialog } from "@/components/delete-category-dialog";
import styles from './mobile-nav.module.css';

interface Props {
  items: Category[];
  userData: User | null;
  avatar: string | null;
}

export function MobileNav({ items, userData, avatar }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const pathname = usePathname();
  const categoryId = pathname.split('/')[3];

  function getPageTitle() {
    if (pathname === '/dashboard') {
      return 'All entries';
    } else if (categoryId) {
      const category = items.find((item) => item.id === categoryId);
      return category?.name ?? '';
    }
    return '';
  }

  function closeSheet() {
    setSheetOpen(false);
  }

  function openSheet() {
    setSheetOpen(true);
  }

  return (
    <div className={styles.mobileNav}>
      <button
        className={styles.trigger}
        onClick={openSheet}
        aria-label="Open navigation menu"
      >
        <MenuIcon size={24} />
      </button>
      <span className={styles.pageTitle}>{getPageTitle()}</span>
      {categoryId && !pathname.split('/').includes('add') && (
        <>
          <Menu.Root>
            <Menu.Trigger className={styles.options} aria-label="Category options">
              <Ellipsis size={20} />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup className={styles.optionsDropdown}>
                  <Menu.Item
                    className={styles.optionsDropdownItem}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash size={16} color="red" />
                    Delete
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
          <DeleteCategoryDialog
            categoryId={categoryId}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <div className={styles.sheetContent}>
          <div className={styles.top}>
            <div className={styles.heading}>
              <Link href="/dashboard" onClick={closeSheet}>
                <span>Content Vault</span>
              </Link>
            </div>

            <div className={styles.items}>
              <Link href="/dashboard" onClick={closeSheet}>
                <div className={`${styles.allItems} ${pathname === '/dashboard' ? styles.activeItem : ''}`}>
                  <LayoutDashboard size={16} />
                  <span>All entries</span>
                </div>
              </Link>

              <p className={styles.subHeading}>Categories</p>

              <ul>
                {items.map((item) => (
                  <Link href={`/dashboard/category/${item.id}`} key={item.id} onClick={closeSheet}>
                    <li className={`${styles.navItem} ${categoryId === item.id ? styles.activeItem : ''}`}>
                      <DynamicIcon name={(item.icon ?? "folder") as IconName} size={16} />
                      <span>{item.name}</span>
                    </li>
                  </Link>
                ))}
                <AddCategory />
              </ul>
            </div>
          </div>

          <div className={styles.footer}>
            <Menu.Root>
              <Menu.Trigger className={styles.userButton} aria-label="User menu">
                {avatar && <Image src={avatar} width={32} height={32} alt="User avatar" />}
                <div className={styles.userInfo}>
                  <p>{userData?.user_metadata?.full_name}</p>
                  <p>{userData?.email}</p>
                </div>
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={10}>
                  <Menu.Popup className={styles.dropdownContent}>
                    <div className={styles.dropdownHeader}>
                      {avatar && (
                        <Image src={avatar} width={32} height={32} alt="User avatar" />
                      )}
                      <div className={styles.headerInfo}>
                        <span className={styles.userName}>
                          {userData?.user_metadata?.full_name}
                        </span>
                        <span className={styles.userEmail}>{userData?.email}</span>
                      </div>
                    </div>
                    <Menu.Separator className={styles.separator} />
                    <Menu.Item className={styles.dropdownItem} onClick={() => setSettingsOpen(true)}>
                      <Settings size={16} />
                      Settings
                    </Menu.Item>
                    <Menu.Item className={styles.dropdownItem}>
                      <SignOutButton />
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </div>
        </div>
      </Sheet>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
