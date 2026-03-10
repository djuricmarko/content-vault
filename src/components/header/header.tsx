import { ReactNode } from "react";
import { Search } from "@/components/search";
import styles from "./header.module.css";

interface Props {
  children?: ReactNode;
}

export function Header({ children }: Props) {
  return (
    <div className={styles.header}>
      <Search />
      {children}
    </div>
  );
}
