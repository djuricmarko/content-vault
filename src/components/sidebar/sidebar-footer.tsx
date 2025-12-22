import Image from "next/image";
import type { User } from "@supabase/auth-js";
import { Settings } from "lucide-react";
import { Menu } from '@base-ui/react/menu';
import { SignOutButton } from "@/components/sign-out-button";
import styles from "./sidebar.module.css";

interface Props {
  userData: User | null;
  avatar: string | null;
}

export function SidebarFooter({ userData, avatar, }: Props) {
  return (
    <div className={styles.footer}>
      <Menu.Root>
        <Menu.Trigger className={styles.triggerButton}>
          {avatar && <Image src={avatar} width={32} height={32} alt="User avatar" />}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
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
              <Menu.Item className={styles.dropdownItem}>
                <Settings size={18} />
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
  );
}
