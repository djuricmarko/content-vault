'use client';

import { useParams } from "next/navigation";
import { Button } from "@/components/button";
import styles from "./header.module.css";
import Link from "next/link";
import { Plus } from "lucide-react";

export function Header() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.header}>
      <input />
      <Link
        href={id ? `/dashboard/category/${id}/add` : "/dashboard/add"}
        aria-label="Create new entry"
      >
        <Button className={styles.new}>
          <Plus size={18} />
          <span>New</span>
        </Button>
      </Link>
    </div>
  );
}
