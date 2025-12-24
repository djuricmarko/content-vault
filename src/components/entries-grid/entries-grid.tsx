import Link from "next/link";
import { Plus } from "lucide-react";
import { formatDistanceToNow } from "@/utils/time";
import { Entry } from "@/lib/drizzle/schema";
import { RenderHtml } from "./render-html";
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
        <Link href={`/dashboard/entry/${item.id}`} key={item.id}>
          <div className={styles.entry}>
            <p className={styles.title}>{item.title}</p>
            <RenderHtml className={styles.content} html={item.content || ''} />
            <span suppressHydrationWarning className={styles.timestamp}>
            {formatDistanceToNow(item.updatedAt as Date)}
          </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
