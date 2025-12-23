'use client';

import { LogOut } from "lucide-react";
import { signOutAction } from "./signOutAction";
import styles from './sign-out-button.module.css';

export function SignOutButton() {
  return (
    <form action={signOutAction} className={styles.form}>
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
