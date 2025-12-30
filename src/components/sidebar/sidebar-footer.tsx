'use client';

import { useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/auth-js";
import { Settings } from "lucide-react";
import { Menu } from '@base-ui/react/menu';
import { SignOutButton } from "@/components/sign-out-button";
import { SettingsDialog } from "@/components/settings-dialog";
import { useSidebar } from "./sidebar-context";
import styles from "./sidebar.module.css";

interface Props {
  userData: User | null;
  avatar: string | null;
}

export function SidebarFooter({ userData, avatar }: Props) {
  const { isCollapsed } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.footer}>
      <Menu.Root>
        <Menu.Trigger className={`${styles.triggerButton} ${isCollapsed ? styles.triggerButtonCollapsed : ''}`} aria-label="User menu">
          {avatar && <Image src={avatar} width={32} height={32} alt="User avatar" />}
          {!isCollapsed && (
            <div className={styles.triggerInfo}>
              <p>{userData?.user_metadata?.full_name}</p>
              <p>{userData?.email}</p>
            </div>
          )}
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
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
