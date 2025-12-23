import { ReactNode, Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarSkeleton } from "@/components/sidebar-skeleton";
import { GridSkeleton } from "@/components/grid-skeleton";
import styles from "./page.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            {children}
          </div>
        </main>
      </Suspense>
    </div>
  );
}
