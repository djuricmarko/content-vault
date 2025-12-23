import Link from "next/link";
import { PiggyBank } from "lucide-react";
import styles from "./sidebar.module.css";

export function SidebarHeading() {
  return (
    <div className={styles.heading}>
      <Link href="/dashboard">
        <PiggyBank size={25} />
        <span>Content Vault</span>
      </Link>
    </div>
  );
}
