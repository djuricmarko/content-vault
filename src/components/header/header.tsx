import styles from "./header.module.css";

export function Header({ title }: { title: string }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  );
}
