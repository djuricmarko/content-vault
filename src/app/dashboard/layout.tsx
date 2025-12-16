import { ReactNode, Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "@/components/sidebar";
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
          {children}
        </main>
      </Suspense>
    </div>
  );
}
