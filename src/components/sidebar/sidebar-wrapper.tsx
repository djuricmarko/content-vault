'use client';

import { type ReactNode } from 'react';
import { SidebarProvider, useSidebar } from './sidebar-context';
import styles from './sidebar.module.css';

function SidebarContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {children}
    </aside>
  );
}

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarContent>{children}</SidebarContent>
    </SidebarProvider>
  );
}
