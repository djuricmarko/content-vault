import Link from "next/link";
import { Plus } from "lucide-react";
import { Entry } from "@/lib/drizzle/schema";
import styles from './entries-grid.module.css';

export function EntriesGrid({ items, slug }: { items: Entry[], slug?: string }) {
  return (
    <div className={styles.container}>
      <Link href={slug ? `/dashboard/${slug}/add` : "/dashboard/add"}>
        <div className={styles.new}>
          <Plus size={25} />
          <p>Create new entry</p>
        </div>
      </Link>
      {items.map((item) => (
        <div className={styles.entry} key={item.id}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.content}>{item.content}</p>
          <p className={styles.category}>{item.categoryId}</p>
          <span className={styles.timestamp}>about 2 hours ago</span>
        </div>
      ))}
    </div>
  );
}
