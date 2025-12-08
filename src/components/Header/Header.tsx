import styles from "./header.module.css";
import Link from "next/link";

export function Header({ title, numberOfEntries }: { title: string, numberOfEntries?: number }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
        {numberOfEntries && (
          <>
            <span>●</span>
            <p>{numberOfEntries} items</p>
          </>
        )}
      </div>
      <Link href="/add">
        <button>
          New Entry
        </button>
      </Link>
    </div>
  );
}
