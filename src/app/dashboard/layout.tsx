import { ReactNode, Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarSkeleton } from "@/components/sidebar-skeleton";
import { Header } from "@/components/header";
import styles from "./page.module.css";

interface Props {
  children: ReactNode;
  headerAction: ReactNode;
}

export default function DashboardLayout({ children, headerAction }: Props) {
  return (
    <div className={styles.layout}>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className={styles.main}>
        <Header>{headerAction}</Header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
