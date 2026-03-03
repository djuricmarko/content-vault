import { Logo } from "@/components/logo";
import styles from "./sidebar-skeleton.module.css";
import sidebarStyles from "../sidebar/sidebar.module.css";

export function SidebarSkeleton() {
  return (
    <aside className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.heading}>
        <div className={sidebarStyles.headingContent}>
          <div className={styles.headingLink}>
            <Logo />
            <span>Content Vault</span>
          </div>
        </div>
      </div>
      <div className={sidebarStyles.items}>
        <div className={styles.allItemsRow}>
          <div className={styles.allItemsIcon} />
          <div className={styles.allItemsLabel} />
        </div>
        <div className={sidebarStyles.subHeading}>
          <div className={styles.categoryLabel} />
        </div>
        <ul>
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className={styles.categoryItem}>
              <div className={styles.categoryIcon} />
              <div className={styles.categoryName} />
            </li>
          ))}
        </ul>
      </div>
      <div className={sidebarStyles.footer} />
    </aside>
  );
}
