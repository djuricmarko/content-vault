import Image from "next/image";
import type { User } from "@supabase/auth-js";
import { Settings } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { SignOutButton } from "@/components/sign-out-button";
import styles from "./sidebar.module.css";

export function SidebarFooter({
  userData,
  avatar,
}: {
  userData: User | null;
  avatar: string | null;
}) {
  return (
    <div className={styles.footer}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.triggerButton} aria-label="User options">
            {avatar && (
              <Image src={avatar} width={32} height={32} alt="User avatar" />
            )}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.dropdownContent}
            sideOffset={5}
            align="start"
          >
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
