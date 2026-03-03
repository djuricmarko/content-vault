'use client';

import Link from "next/link";
import { PanelRight, PanelLeft } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import styles from "./sidebar.module.css";
import { Logo } from "@/components/logo";

export function SidebarHeading() {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  return (
    <div className={styles.heading}>
      <div className={styles.headingContent}>
        {!isCollapsed && (
          <Link href="/dashboard">
            <Logo />
            <span>Content Vault</span>
          </Link>
        )}
        <button
          className={styles.collapseButton}
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
        </button>
      </div>
    </div>
  );
}
