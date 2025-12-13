import { ReactNode, Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import styles from "./page.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
