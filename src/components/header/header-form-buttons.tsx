"use client";

import Link from "next/link";
import { Button } from "@/components/button";
import styles from "./header.module.css";

interface Props {
  cancelHref: string;
}

export function HeaderFormButtons({ cancelHref }: Props) {
  return (
    <div className={styles.buttons}>
      <Link href={cancelHref}>
        <Button variant="secondary" className={styles.new}>
          Cancel
        </Button>
      </Link>
      <Button type="submit" form="new-entry" className={styles.new}>
        Save
      </Button>
    </div>
  );
}
