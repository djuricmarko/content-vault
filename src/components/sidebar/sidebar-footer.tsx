'use client';

import { useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/auth-js";
import { Settings } from "lucide-react";
import { Menu } from '@base-ui/react/menu';
import { SignOutButton } from "@/components/sign-out-button";
import { SettingsDialog } from "@/components/settings-dialog";
import type { Profile } from "@/lib/drizzle/schema";
import styles from "./sidebar.module.css";

interface Props {
  userData: User | null;
  avatar: string | null;
  profile: Profile | null;
}

export function SidebarFooter({ userData, avatar, profile }: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const displayName = profile ? `${profile.name} ${profile.surname}` : userData?.user_metadata?.full_name;

  return (
    <div className={styles.footer}>
      <Menu.Root>
        <div className={styles.user}>
          {avatar && <Image src={avatar} width={30} height={30} alt="User avatar" />}
          <div className={styles.triggerInfo}>
            <p>{displayName}</p>
            <p>{userData?.email}</p>
          </div>
        </div>
        <Menu.Trigger
          className={styles.triggerButton}
          aria-label="User menu"
        >
          <Settings size={18} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={10}>
            <Menu.Popup className={styles.dropdownContent}>
              <div className={styles.dropdownHeader}>
                {avatar && (
                  <Image src={avatar} width={30} height={30} alt="User avatar" />
                )}
                <div className={styles.headerInfo}>
                <span className={styles.userName}>
                  {displayName}
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
