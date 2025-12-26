'use client';

import { LogOut } from "lucide-react";
import { signOut } from "@/actions/signOut";
import styles from './sign-out-button.module.css';

export function SignOutButton() {
  return (
    <form action={signOut} className={styles.form}>
      <button
        type="submit"
        onClick={(e) => e.stopPropagation()}
        className={styles.dropdownItem}
      >
        <LogOut size={16} />
        Sign out
      </button>
    </form>
  );
}
