'use client';

import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/(auth)/_actions";
import styles from './sign-out-button.module.css';

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        onClick={(e) => e.stopPropagation()}
        className={styles.dropdownItem}
      >
        <LogOut size={18} />
        Sign out
      </button>
    </form>
  );
}
