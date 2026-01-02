import { ReactNode, Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarSkeleton } from "@/components/sidebar-skeleton";
import { MobileNavServer } from "@/components/mobile-nav";
import styles from "./page.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className={styles.main}>
        <div className={styles.mobileHeader}>
          <Suspense fallback={null}>
            <MobileNavServer />
          </Suspense>
        </div>
        <div className={styles.wrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
