import { ReactNode, Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarSkeleton } from "@/components/sidebar-skeleton";
import { Header } from "@/components/header";
import styles from "./page.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
