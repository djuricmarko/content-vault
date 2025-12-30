'use client';

import Link from "next/link";
import { PiggyBank, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import styles from "./sidebar.module.css";

export function SidebarHeading() {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  return (
    <div className={styles.heading}>
      <div className={styles.headingContent}>
        <Link href="/dashboard">
          <PiggyBank size={25} />
          {!isCollapsed && <span>Content Vault</span>}
        </Link>
        <button
          className={styles.collapseButton}
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelRightClose size={22} /> : <PanelRightOpen size={22} />}
        </button>
      </div>
    </div>
  );
}
