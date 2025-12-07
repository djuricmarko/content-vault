import styles from './sidebar.module.css';
import { LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h1>Content Vault</h1>
      </div>
      <div className={styles.items}>
        <ul>
          <li>All items</li>
          <li>Category #1</li>
          <li>Category #2</li>
          <li>Category #3</li>
        </ul>
        <button>Add category</button>
      </div>
      <div className={styles.footer}>
        <p>maredjuric@gmail.com</p>
        <LogOut />
      </div>
    </div>
  );
}
